<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Event;
use App\Models\EventImage;
use App\Models\TicketType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_published_upcoming_events(): void
    {
        $category = Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'description' => 'Music events.',
            'is_active' => true,
        ]);

        Event::create([
            'category_id' => $category->id,
            'title' => 'Jakarta Music Festival',
            'slug' => 'jakarta-music-festival',
            'description' => 'A music festival in Jakarta.',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(30),
            'status' => 'published',
            'is_featured' => true,
        ]);

        Event::create([
            'category_id' => $category->id,
            'title' => 'Past Music Festival',
            'slug' => 'past-music-festival',
            'description' => 'An old event.',
            'city' => 'Jakarta',
            'starts_at' => now()->subDays(10),
            'status' => 'published',
            'is_featured' => false,
        ]);

        Event::create([
            'category_id' => $category->id,
            'title' => 'Draft Music Festival',
            'slug' => 'draft-music-festival',
            'description' => 'A draft event.',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(20),
            'status' => 'draft',
            'is_featured' => false,
        ]);

        $response = $this->getJson('/api/events');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'jakarta-music-festival')
            ->assertJsonPath('data.0.category.slug', 'music');
    }

    public function test_can_filter_events_by_category(): void
    {
        $music = Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'is_active' => true,
        ]);

        $sports = Category::create([
            'name' => 'Sports',
            'slug' => 'sports',
            'is_active' => true,
        ]);

        Event::create([
            'category_id' => $music->id,
            'title' => 'Music Festival',
            'slug' => 'music-festival',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(30),
            'status' => 'published',
        ]);

        Event::create([
            'category_id' => $sports->id,
            'title' => 'Golf Tournament',
            'slug' => 'golf-tournament',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(40),
            'status' => 'published',
        ]);

        $response = $this->getJson('/api/events?category=music');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'music-festival');
    }

    public function test_can_filter_events_by_city(): void
    {
        $category = Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'is_active' => true,
        ]);

        Event::create([
            'category_id' => $category->id,
            'title' => 'Jakarta Concert',
            'slug' => 'jakarta-concert',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(30),
            'status' => 'published',
        ]);

        Event::create([
            'category_id' => $category->id,
            'title' => 'Bandung Concert',
            'slug' => 'bandung-concert',
            'city' => 'Bandung',
            'starts_at' => now()->addDays(40),
            'status' => 'published',
        ]);

        $response = $this->getJson('/api/events?city=Bandung');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'bandung-concert');
    }

    public function test_can_filter_featured_events(): void
    {
        $category = Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'is_active' => true,
        ]);

        Event::create([
            'category_id' => $category->id,
            'title' => 'Featured Concert',
            'slug' => 'featured-concert',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(30),
            'status' => 'published',
            'is_featured' => true,
        ]);

        Event::create([
            'category_id' => $category->id,
            'title' => 'Regular Concert',
            'slug' => 'regular-concert',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(40),
            'status' => 'published',
            'is_featured' => false,
        ]);

        $response = $this->getJson('/api/events?featured=1');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'featured-concert')
            ->assertJsonPath('data.0.is_featured', true);
    }

    public function test_can_get_event_detail_with_images_and_ticket_types(): void
    {
        $category = Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'is_active' => true,
        ]);

        $event = Event::create([
            'category_id' => $category->id,
            'title' => 'Jakarta Music Festival',
            'slug' => 'jakarta-music-festival',
            'description' => 'A large music festival.',
            'venue_name' => 'GBK',
            'venue_address' => 'Jl. Pintu Satu Senayan',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(30),
            'ends_at' => now()->addDays(30)->addHours(5),
            'status' => 'published',
            'is_featured' => true,
        ]);

        EventImage::create([
            'event_id' => $event->id,
            'image' => 'events/jakarta-music-festival-1.webp',
            'alt_text' => 'Jakarta Music Festival',
            'sort_order' => 0,
            'is_primary' => true,
        ]);

        TicketType::create([
            'event_id' => $event->id,
            'name' => 'Regular',
            'description' => 'Regular admission ticket.',
            'price' => 150000,
            'quota' => 1000,
            'sold' => 150,
            'is_active' => true,
        ]);

        TicketType::create([
            'event_id' => $event->id,
            'name' => 'VIP',
            'description' => 'VIP admission ticket.',
            'price' => 350000,
            'quota' => 200,
            'sold' => 50,
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/events/jakarta-music-festival');

        $response
            ->assertOk()
            ->assertJsonPath('data.title', 'Jakarta Music Festival')
            ->assertJsonPath('data.category.slug', 'music')
            ->assertJsonPath('data.venue.name', 'GBK')
            ->assertJsonCount(1, 'data.images')
            ->assertJsonPath(
                'data.images.0.image',
                'events/jakarta-music-festival-1.webp'
            )
            ->assertJsonCount(2, 'data.ticket_types')
            ->assertJsonPath('data.ticket_types.0.name', 'Regular')
            ->assertJsonPath('data.ticket_types.0.available', 850)
            ->assertJsonPath('data.ticket_types.1.name', 'VIP')
            ->assertJsonPath('data.ticket_types.1.available', 150);
    }

    public function test_unpublished_event_cannot_be_viewed(): void
    {
        $category = Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'is_active' => true,
        ]);

        Event::create([
            'category_id' => $category->id,
            'title' => 'Draft Event',
            'slug' => 'draft-event',
            'city' => 'Jakarta',
            'starts_at' => now()->addDays(30),
            'status' => 'draft',
        ]);

        $this
            ->getJson('/api/events/draft-event')
            ->assertNotFound();
    }

    public function test_unknown_event_returns_not_found(): void
    {
        $this
            ->getJson('/api/events/does-not-exist')
            ->assertNotFound();
    }
}