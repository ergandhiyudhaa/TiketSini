<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_active_categories(): void
    {
        Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'description' => 'Music events.',
            'is_active' => true,
        ]);

        Category::create([
            'name' => 'Sports',
            'slug' => 'sports',
            'description' => 'Sports events.',
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/categories');

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.slug', 'music')
            ->assertJsonPath('data.1.slug', 'sports');
    }

    public function test_inactive_categories_are_not_returned(): void
    {
        Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'description' => 'Music events.',
            'is_active' => true,
        ]);

        Category::create([
            'name' => 'Hidden Category',
            'slug' => 'hidden-category',
            'description' => 'This category should not be visible.',
            'is_active' => false,
        ]);

        $response = $this->getJson('/api/categories');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'music');
    }

    public function test_can_get_category_by_slug(): void
    {
        Category::create([
            'name' => 'Music',
            'slug' => 'music',
            'description' => 'Music events.',
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/categories/music');

        $response
            ->assertOk()
            ->assertJsonPath('data.name', 'Music')
            ->assertJsonPath('data.slug', 'music')
            ->assertJsonPath('data.is_active', true);
    }

    public function test_cannot_get_inactive_category_by_slug(): void
    {
        Category::create([
            'name' => 'Hidden Category',
            'slug' => 'hidden-category',
            'description' => 'This category is inactive.',
            'is_active' => false,
        ]);

        $this
            ->getJson('/api/categories/hidden-category')
            ->assertNotFound();
    }

    public function test_unknown_category_returns_not_found(): void
    {
        $this
            ->getJson('/api/categories/does-not-exist')
            ->assertNotFound();
    }
}