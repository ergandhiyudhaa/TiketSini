<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EventController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', 'string', 'max:100'],
            'city' => ['nullable', 'string', 'max:100'],
            'featured' => ['nullable', 'boolean'],
            'sort' => ['nullable', 'in:upcoming,latest'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $query = Event::query()
            ->with(['category', 'ticketTypes'])
            ->where('status', 'published')
            ->where('starts_at', '>=', now())
            ->when(
                $request->filled('search'),
                function ($query) use ($request) {
                    $search = $request->string('search');

                    $query->where(function ($eventQuery) use ($search) {
                        $eventQuery
                            ->where('title', 'like', '%' . $search . '%')
                            ->orWhere('description', 'like', '%' . $search . '%')
                            ->orWhere('venue_name', 'like', '%' . $search . '%')
                            ->orWhere('city', 'like', '%' . $search . '%');
                    });
                }
            )
            ->when(
                $request->filled('category'),
                function ($query) use ($request) {
                    $query->whereHas('category', function ($categoryQuery) use ($request) {
                        $categoryQuery->where(
                            'slug',
                            $request->string('category')
                        );
                    });
                }
            )
            ->when(
                $request->filled('city'),
                function ($query) use ($request) {
                    $query->where(
                        'city',
                        $request->string('city')
                    );
                }
            )
            ->when(
                $request->boolean('featured'),
                function ($query) {
                    $query->where('is_featured', true);
                }
            );

        $sort = $validated['sort'] ?? 'upcoming';

        if ($sort === 'latest') {
            $query
                ->orderByDesc('created_at')
                ->orderByDesc('id');
        } else {
            $query
                ->orderBy('starts_at')
                ->orderBy('id');
        }

        $perPage = $validated['per_page'] ?? 12;

        return EventResource::collection(
            $query->paginate($perPage)->withQueryString()
        );
    }

    public function show(string $slug): EventResource
    {
        $event = Event::query()
            ->with([
                'category',
                'images',
                'ticketTypes',
            ])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return new EventResource($event);
    }
}