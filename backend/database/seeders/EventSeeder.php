<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Event;
use App\Models\TicketType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'category' => 'music',
                'title' => 'Jakarta Music Festival 2026',
                'description' => 'A massive live music experience featuring exciting performances, unforgettable moments, and the best atmosphere in Jakarta.',
                'cover_image' => 'events/jakarta-music-festival-2026.svg',
                'venue_name' => 'Jakarta International Expo',
                'venue_address' => 'Jl. Benyamin Sueb No. 1, Kemayoran',
                'city' => 'Jakarta',
                'starts_at' => now()->addDays(19)->setTime(18, 30),
                'ends_at' => now()->addDays(19)->setTime(23, 30),
                'is_featured' => true,
                'tickets' => [
                    ['name' => 'Early Bird', 'price' => 150000, 'quota' => 500],
                    ['name' => 'Regular', 'price' => 250000, 'quota' => 1000],
                    ['name' => 'VIP', 'price' => 500000, 'quota' => 200],
                ],
            ],
            [
                'category' => 'sports',
                'title' => 'Jakarta Sports Championship 2026',
                'description' => 'An exciting multi-sport championship bringing athletes and sports enthusiasts together for an unforgettable competition.',
                'cover_image' => 'events/jakarta-sports-championship-2026.svg',
                'venue_name' => 'Gelora Bung Karno Sports Complex',
                'venue_address' => 'Jl. Pintu Satu Senayan, Jakarta',
                'city' => 'Jakarta',
                'starts_at' => now()->addDays(25)->setTime(8, 0),
                'ends_at' => now()->addDays(25)->setTime(18, 0),
                'is_featured' => true,
                'tickets' => [
                    ['name' => 'General Admission', 'price' => 75000, 'quota' => 1000],
                    ['name' => 'Premium Seat', 'price' => 150000, 'quota' => 300],
                ],
            ],
            [
                'category' => 'comedy',
                'title' => 'Comedy Night Jakarta',
                'description' => 'A night full of laughter featuring some of the most entertaining stand-up comedians in Indonesia.',
                'cover_image' => 'events/comedy-night-jakarta.svg',
                'venue_name' => 'The Kasablanka Hall',
                'venue_address' => 'Jl. Casablanca Raya Kav. 88, Jakarta',
                'city' => 'Jakarta',
                'starts_at' => now()->addDays(32)->setTime(19, 0),
                'ends_at' => now()->addDays(32)->setTime(22, 0),
                'is_featured' => false,
                'tickets' => [
                    ['name' => 'Regular', 'price' => 100000, 'quota' => 500],
                    ['name' => 'VIP', 'price' => 250000, 'quota' => 150],
                ],
            ],
            [
                'category' => 'conference',
                'title' => 'Indonesia Creative Conference 2026',
                'description' => 'A creative industry conference connecting designers, developers, entrepreneurs, and digital professionals.',
                'cover_image' => 'events/indonesia-creative-conference-2026.svg',
                'venue_name' => 'ICE BSD',
                'venue_address' => 'Jl. BSD Grand Boulevard, BSD City',
                'city' => 'Tangerang',
                'starts_at' => now()->addDays(40)->setTime(9, 0),
                'ends_at' => now()->addDays(40)->setTime(17, 0),
                'is_featured' => true,
                'tickets' => [
                    ['name' => 'General', 'price' => 200000, 'quota' => 800],
                    ['name' => 'Professional', 'price' => 400000, 'quota' => 400],
                ],
            ],
            [
                'category' => 'festival',
                'title' => 'Sunset Festival Bali 2026',
                'description' => 'Experience music, art, food, and unforgettable sunset moments in one of Bali’s most exciting festivals.',
                'cover_image' => 'events/sunset-festival-bali-2026.svg',
                'venue_name' => 'GWK Cultural Park',
                'venue_address' => 'Jl. Raya Uluwatu, Ungasan',
                'city' => 'Bali',
                'starts_at' => now()->addDays(52)->setTime(15, 0),
                'ends_at' => now()->addDays(52)->setTime(23, 0),
                'is_featured' => true,
                'tickets' => [
                    ['name' => 'Presale', 'price' => 175000, 'quota' => 1000],
                    ['name' => 'Regular', 'price' => 275000, 'quota' => 1500],
                ],
            ],
            [
                'category' => 'workshop',
                'title' => 'Product Design Masterclass',
                'description' => 'A practical product design workshop covering UX strategy, interface design, prototyping, and design systems.',
                'cover_image' => 'events/product-design-masterclass.svg',
                'venue_name' => 'Bandung Creative Hub',
                'venue_address' => 'Jl. Laswi No. 7, Bandung',
                'city' => 'Bandung',
                'starts_at' => now()->addDays(60)->setTime(9, 0),
                'ends_at' => now()->addDays(60)->setTime(16, 0),
                'is_featured' => false,
                'tickets' => [
                    ['name' => 'Early Bird', 'price' => 300000, 'quota' => 100],
                    ['name' => 'Regular', 'price' => 450000, 'quota' => 150],
                ],
            ],
            [
                'category' => 'exhibition',
                'title' => 'Jakarta Contemporary Art Exhibition',
                'description' => 'Explore contemporary artworks from emerging and established artists across Indonesia.',
                'cover_image' => 'events/jakarta-contemporary-art-exhibition.svg',
                'venue_name' => 'Museum MACAN',
                'venue_address' => 'AKR Tower, Kebon Jeruk, Jakarta',
                'city' => 'Jakarta',
                'starts_at' => now()->addDays(70)->setTime(10, 0),
                'ends_at' => now()->addDays(70)->setTime(20, 0),
                'is_featured' => false,
                'tickets' => [
                    ['name' => 'General Admission', 'price' => 75000, 'quota' => 500],
                    ['name' => 'Premium', 'price' => 150000, 'quota' => 150],
                ],
            ],
            [
                'category' => 'music',
                'title' => 'Acoustic Evening Bandung',
                'description' => 'An intimate acoustic music evening featuring talented local musicians in a relaxed atmosphere.',
                'cover_image' => 'events/acoustic-evening-bandung.svg',
                'venue_name' => 'Saparua Park',
                'venue_address' => 'Jl. Ambon No. 9, Bandung',
                'city' => 'Bandung',
                'starts_at' => now()->addDays(82)->setTime(19, 0),
                'ends_at' => now()->addDays(82)->setTime(22, 0),
                'is_featured' => false,
                'tickets' => [
                    ['name' => 'Regular', 'price' => 100000, 'quota' => 500],
                    ['name' => 'VIP', 'price' => 200000, 'quota' => 100],
                ],
            ],
        ];

        foreach ($events as $eventData) {
            $category = Category::where(
                'slug',
                $eventData['category']
            )->firstOrFail();

            $tickets = $eventData['tickets'];

            unset(
                $eventData['category'],
                $eventData['tickets']
            );

            $event = Event::updateOrCreate(
                [
                    'slug' => Str::slug($eventData['title']),
                ],
                [
                    ...$eventData,
                    'category_id' => $category->id,
                    'status' => 'published',
                ]
            );

            foreach ($tickets as $ticket) {
                TicketType::updateOrCreate(
                    [
                        'event_id' => $event->id,
                        'name' => $ticket['name'],
                    ],
                    [
                        'description' => null,
                        'price' => $ticket['price'],
                        'quota' => $ticket['quota'],
                        'sold' => 0,
                        'sales_start_at' => now(),
                        'sales_end_at' => $event->starts_at,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}