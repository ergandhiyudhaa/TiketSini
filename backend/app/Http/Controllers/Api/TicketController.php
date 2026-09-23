<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TicketController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tickets = Ticket::query()
            ->whereHas('order', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id)
                    ->whereIn('status', ['paid', 'completed']);
            })
            ->with([
                'order.user',
                'orderItem.ticketType.event',
            ])
            ->latest()
            ->get();

        return response()->json([
            'tickets' => $tickets->map(
                fn (Ticket $ticket) => $this->transformTicket($ticket)
            ),
        ]);
    }

    public function show(Request $request, Ticket $ticket): JsonResponse
    {
        $this->authorizeTicket($request, $ticket);

        $ticket->load([
            'order.user',
            'orderItem.ticketType.event',
        ]);

        return response()->json([
            'ticket' => $this->transformTicket($ticket),
        ]);
    }

    public function downloadPdf(Request $request, Ticket $ticket)
    {
        $this->authorizeTicket($request, $ticket);

        $ticket->load([
            'order.user',
            'orderItem.ticketType.event',
        ]);

        $event = $ticket->orderItem?->ticketType?->event;

        $qrCode = base64_encode(
            QrCode::format('svg')
                ->size(220)
                ->margin(1)
                ->generate($ticket->ticket_code)
        );

        $pdf = Pdf::loadView('tickets.ticket', [
            'ticket' => $ticket,
            'event' => $event,
            'qrCode' => $qrCode,
        ]);

        $pdf->setPaper('a4', 'portrait');

        return $pdf->download(
            'TiketSini-' . $ticket->ticket_code . '.pdf'
        );
    }

    public function validateTicket(
        Request $request,
        string $ticketCode
    ): JsonResponse {
        $ticket = Ticket::query()
            ->with([
                'order.user',
                'orderItem.ticketType.event',
            ])
            ->where('ticket_code', $ticketCode)
            ->first();

        if (!$ticket) {
            return response()->json([
                'valid' => false,
                'message' => 'Ticket not found.',
            ], 404);
        }

        if ($ticket->status === 'used') {
            return response()->json([
                'valid' => false,
                'message' => 'This ticket has already been used.',
                'ticket' => $this->transformTicket($ticket),
            ], 422);
        }

        if ($ticket->status !== 'active') {
            return response()->json([
                'valid' => false,
                'message' => 'This ticket is not active.',
            ], 422);
        }

        return response()->json([
            'valid' => true,
            'message' => 'Ticket is valid.',
            'ticket' => $this->transformTicket($ticket),
        ]);
    }

    public function checkIn(
        Request $request,
        string $ticketCode
    ): JsonResponse {

        $result = DB::transaction(function () use ($ticketCode) {

            $ticket = Ticket::query()
                ->with([
                    'order.user',
                    'orderItem.ticketType.event',
                ])
                ->where('ticket_code', $ticketCode)
                ->lockForUpdate()
                ->first();

            if (!$ticket) {
                return [
                    'status' => 404,
                    'response' => [
                        'success' => false,
                        'message' => 'Ticket not found.',
                    ],
                ];
            }

            if ($ticket->status === 'used') {
                return [
                    'status' => 422,
                    'response' => [
                        'success' => false,
                        'message' => 'Ticket has already been checked in.',
                        'ticket' => $this->transformTicket($ticket),
                    ],
                ];
            }

            if ($ticket->status !== 'active') {
                return [
                    'status' => 422,
                    'response' => [
                        'success' => false,
                        'message' => 'Ticket is not active.',
                        'ticket' => $this->transformTicket($ticket),
                    ],
                ];
            }

            $ticket->update([
                'status' => 'used',
                'checked_in_at' => now(),
            ]);

            $ticket->refresh();

            return [
                'status' => 200,
                'response' => [
                    'success' => true,
                    'message' => 'Ticket checked in successfully.',
                    'ticket' => $this->transformTicket(
                        $ticket->load([
                            'order.user',
                            'orderItem.ticketType.event',
                        ])
                    ),
                ],
            ];
        });

        return response()->json(
            $result['response'],
            $result['status']
        );
    }

    private function authorizeTicket(
        Request $request,
        Ticket $ticket
    ): void {
        $ticket->loadMissing('order');

        if ($ticket->order->user_id !== $request->user()->id) {
            abort(403, 'You are not allowed to access this ticket.');
        }
    }

    private function transformTicket(Ticket $ticket): array
    {
        $event = $ticket->orderItem?->ticketType?->event;

        return [
            'id' => $ticket->id,
            'ticket_code' => $ticket->ticket_code,
            'status' => $ticket->status,
            'checked_in_at' => $ticket->checked_in_at?->toISOString(),

            'order' => [
                'id' => $ticket->order?->id,
                'order_number' => $ticket->order?->order_number,
                'status' => $ticket->order?->status,
                'total' => (float) ($ticket->order?->total ?? 0),
            ],

            'holder' => [
                'name' => $ticket->order?->user?->name,
                'email' => $ticket->order?->user?->email,
            ],

            'ticket_type' => [
                'id' => $ticket->ticketType?->id,
                'name' => $ticket->ticketType?->name,
                'price' => (float) ($ticket->ticketType?->price ?? 0),
            ],

            'event' => $event ? [
                'id' => $event->id,
                'name' => $event->title,
                'slug' => $event->slug,
                'description' => $event->description,
                'image' => $event->cover_image
                    ? asset('storage/' . $event->cover_image)
                    : null,
                'start_at' => $event->starts_at?->toISOString(),
                'end_at' => $event->ends_at?->toISOString(),
                'venue' => $event->venue_name,
                'location' => $event->venue_address,
                'city' => $event->city,
            ] : null,
        ];
    }
}
