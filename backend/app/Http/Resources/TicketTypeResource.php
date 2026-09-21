<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'quota' => $this->quota,
            'sold' => $this->sold,
            'available' => max(0, $this->quota - $this->sold),
            'sales_start_at' => $this->sales_start_at?->toISOString(),
            'sales_end_at' => $this->sales_end_at?->toISOString(),
            'is_active' => $this->is_active,
        ];
    }
}