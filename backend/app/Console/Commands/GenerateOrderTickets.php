<?php

namespace App\Console\Commands;

use App\Models\Order;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GenerateOrderTickets extends Command
{
    protected $signature = 'app:generate-order-tickets
                            {order : Order ID atau order number}
                            {--force : Generate ulang jika ticket sudah ada}';

    protected $description = 'Generate individual tickets for a paid order';

    public function handle(): int
    {
        $identifier = $this->argument('order');

        $order = Order::query()
            ->with(['items.ticketType.event', 'tickets'])
            ->where(function ($query) use ($identifier) {
                $query->where('id', $identifier)
                    ->orWhere('order_number', $identifier);
            })
            ->first();

        if (!$order) {
            $this->error("Order tidak ditemukan: {$identifier}");

            return self::FAILURE;
        }

        $this->info("Order: {$order->order_number}");
        $this->info("Status: {$order->status}");

        if (!in_array($order->status, ['paid', 'completed'], true)) {
            $this->error(
                'Ticket hanya dapat dibuat untuk order dengan status paid atau completed.'
            );

            return self::FAILURE;
        }

        if (!$this->option('force') && $order->tickets->isNotEmpty()) {
            $this->warn(
                "Order ini sudah memiliki {$order->tickets->count()} ticket."
            );

            $this->line('Gunakan --force jika memang ingin generate ulang.');

            return self::SUCCESS;
        }

        $createdTickets = DB::transaction(function () use ($order) {
            if ($this->option('force')) {
                $order->tickets()->delete();
            }

            $tickets = [];

            foreach ($order->items as $item) {
                $quantity = (int) $item->quantity;

                for ($index = 1; $index <= $quantity; $index++) {
                    $ticketNumber = $this->generateTicketNumber(
                        $order->order_number,
                        $item->id,
                        $index
                    );

                    $ticketCode = $this->generateTicketCode();

                    $ticket = $order->tickets()->create([
                        'order_item_id' => $item->id,
                        'ticket_type_id' => $item->ticket_type_id,
                        'ticket_number' => $ticketNumber,
                        'ticket_code' => $ticketCode,
                        'status' => 'active',
                    ]);

                    $tickets[] = $ticket;
                }
            }

            return $tickets;
        });

        $this->newLine();
        $this->info(
            'Berhasil membuat ' . count($createdTickets) . ' ticket.'
        );

        $this->newLine();

        foreach ($createdTickets as $ticket) {
            $this->line(
                "{$ticket->ticket_number} | {$ticket->ticket_code}"
            );
        }

        return self::SUCCESS;
    }

    private function generateTicketNumber(
        string $orderNumber,
        int $orderItemId,
        int $sequence
    ): string {
        return strtoupper(
            "{$orderNumber}-{$orderItemId}-{$sequence}"
        );
    }

    private function generateTicketCode(): string
    {
        do {
            $code = strtoupper(
                Str::random(32)
            );
        } while (
            \App\Models\Ticket::where('ticket_code', $code)->exists()
        );

        return $code;
    }
}
