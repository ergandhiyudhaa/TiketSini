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
        $query = Event::query()
            ->with('category')
            ->where('status', 'published')
            ->where('starts_at', '>=', now())
            ->when(
                $request->filled('category'),
                function ($query) use ($request) {
                    $query->whereHas('category', function ($categoryQuery) use ($request) {
                        $categoryQuery->where('slug', $request->string('category'));
                    });
                }
            )
            ->when(
                $request->filled('city'),
                function ($query) use ($request) {
                    $query->where('city', $request->string('city'));
                }
            )
            ->when(
                $request->boolean('featured'),
                function ($query) {
                    $query->where('is_featured', true);
                }
            )
            ->orderBy('starts_at');

        return EventResource::collection(
            $query->paginate(12)
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