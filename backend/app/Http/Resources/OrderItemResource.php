<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $this->resource->loadMissing('ticketType.event');

        $event = $this->ticketType?->event;

        return [
            'id' => $this->id,

            'ticket_type_id' => $this->ticket_type_id,

            'ticket_name' => $this->ticket_name,

            'quantity' => (int) $this->quantity,

            'unit_price' => (float) $this->unit_price,

            'subtotal' => (float) $this->subtotal,

            'event' => $event ? [
                'id' => $event->id,
                'name' => $event->title,
                'slug' => $event->slug,
                'description' => $event->description,
                'image' => $event->cover_image ? asset('storage/' . $event->cover_image) : null,
                'start_at' => $event->starts_at?->toISOString(),
                'end_at' => $event->ends_at?->toISOString(),
                'venue' => $event->venue_name,
                'location' => $event->venue_address,
                'city' => $event->city,
            ] : null,
        ];
    }
}
