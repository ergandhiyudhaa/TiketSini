<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'cover_image' => $this->cover_image,

            'category' => $this->whenLoaded('category', function () {
                return [
                    'id' => $this->category->id,
                    'name' => $this->category->name,
                    'slug' => $this->category->slug,
                ];
            }),

            'venue' => [
                'name' => $this->venue_name,
                'address' => $this->venue_address,
                'city' => $this->city,
            ],

            'starts_at' => $this->starts_at?->toISOString(),
            'ends_at' => $this->ends_at?->toISOString(),

            'status' => $this->status,
            'is_featured' => $this->is_featured,

            'images' => EventImageResource::collection(
                $this->whenLoaded('images')
            ),

            'ticket_types' => TicketTypeResource::collection(
                $this->whenLoaded('ticketTypes')
            ),
        ];
    }
}