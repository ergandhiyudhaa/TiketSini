<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Music',
                'slug' => 'music',
                'description' => 'Music concerts, live performances, and music festivals.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Sports',
                'slug' => 'sports',
                'description' => 'Sports events, tournaments, and competitions.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Comedy',
                'slug' => 'comedy',
                'description' => 'Stand-up comedy shows and entertainment events.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Festival',
                'slug' => 'festival',
                'description' => 'Festivals, cultural events, and community celebrations.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Conference',
                'slug' => 'conference',
                'description' => 'Business, technology, and professional conferences.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Workshop',
                'slug' => 'workshop',
                'description' => 'Educational workshops, classes, and training events.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Exhibition',
                'slug' => 'exhibition',
                'description' => 'Art, technology, business, and public exhibitions.',
                'image' => null,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}