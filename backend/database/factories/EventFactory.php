<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        $title = fake()->unique()->sentence(4);

        return [
            'category_id' => Category::factory(),
            'organizer_id' => null,
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->paragraphs(3, true),
            'cover_image' => null,
            'venue_name' => fake()->company(),
            'venue_address' => fake()->address(),
            'city' => fake()->randomElement([
                'Jakarta',
                'Bandung',
                'Surabaya',
                'Yogyakarta',
                'Bali',
            ]),
            'starts_at' => fake()->dateTimeBetween('+7 days', '+6 months'),
            'ends_at' => null,
            'status' => 'published',
            'is_featured' => false,
        ];
    }
}