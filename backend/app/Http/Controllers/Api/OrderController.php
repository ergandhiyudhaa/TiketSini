<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\TicketType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $orders = $request->user()
            ->orders()
            ->with([
                'items.ticketType.event',
            ])
            ->latest()
            ->get();

        return response()->json([
            'orders' => OrderResource::collection($orders),
        ]);
    }

    public function store(Request $request): OrderResource
    {
        $validated = $request->validate([
            'items' => ['required', 'array', 'min:1'],
            'items.*.ticket_type_id' => ['required', 'integer', 'exists:ticket_types,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:10'],
        ]);

        $order = DB::transaction(function () use ($validated, $request) {
            $ticketTypeIds = collect($validated['items'])
                ->pluck('ticket_type_id')
                ->unique()
                ->values();

            $ticketTypes = TicketType::whereIn('id', $ticketTypeIds)
                ->where('is_active', true)
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            if ($ticketTypes->count() !== $ticketTypeIds->count()) {
                throw ValidationException::withMessages([
                    'items' => ['One or more selected ticket types are unavailable.'],
                ]);
            }

            $subtotal = 0;

            $order = Order::create([
                'user_id' => $request->user()->id,
                'order_number' => 'TS-' . now()->format('YmdHis') . '-' . Str::upper(Str::random(6)),
                'status' => 'pending',
                'subtotal' => 0,
                'service_fee' => 0,
                'total' => 0,
                'expires_at' => now()->addMinutes(30),
            ]);

            foreach ($validated['items'] as $item) {
                $ticket = $ticketTypes->get($item['ticket_type_id']);
                $quantity = (int) $item['quantity'];

                $available = (int) $ticket->quota - (int) $ticket->sold;

                if ($quantity > $available) {
                    throw ValidationException::withMessages([
                        'items' => [
                            "Not enough tickets available for {$ticket->name}.",
                        ],
                    ]);
                }

                $itemSubtotal = (float) $ticket->price * $quantity;
                $subtotal += $itemSubtotal;

                $order->items()->create([
                    'ticket_type_id' => $ticket->id,
                    'ticket_name' => $ticket->name,
                    'quantity' => $quantity,
                    'unit_price' => $ticket->price,
                    'subtotal' => $itemSubtotal,
                ]);
            }

            $serviceFee = round($subtotal * 0.05);
            $total = $subtotal + $serviceFee;

            $order->update([
                'subtotal' => $subtotal,
                'service_fee' => $serviceFee,
                'total' => $total,
            ]);

            return $order->load('items', 'user');
        });

        return new OrderResource($order);
    }

    public function show(Request $request, Order $order): OrderResource
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403, 'You are not allowed to view this order.');
        }

        return new OrderResource(
            $order->load('items.ticketType.event', 'user')
        );
    }
}
