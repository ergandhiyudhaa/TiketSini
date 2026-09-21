<?php

namespace Tests\Feature;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register(): void
    {
        $customerRole = Role::create([
            'name' => 'Customer',
            'slug' => 'customer',
            'description' => 'User who purchases and manages event tickets.',
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Test Customer',
            'email' => 'customer@tiketsini.test',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Registration successful.')
            ->assertJsonPath('user.name', 'Test Customer')
            ->assertJsonPath('user.email', 'customer@tiketsini.test')
            ->assertJsonPath('user.role.slug', 'customer')
            ->assertJsonStructure([
                'message',
                'user',
                'token',
                'token_type',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'customer@tiketsini.test',
            'role_id' => $customerRole->id,
        ]);
    }

    public function test_user_can_login(): void
    {
        $customerRole = Role::create([
            'name' => 'Customer',
            'slug' => 'customer',
            'description' => 'User who purchases and manages event tickets.',
        ]);

        $this->postJson('/api/register', [
            'name' => 'Login Customer',
            'email' => 'login@tiketsini.test',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'login@tiketsini.test',
            'password' => 'password123',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Login successful.')
            ->assertJsonPath('user.email', 'login@tiketsini.test')
            ->assertJsonPath('user.role.slug', 'customer')
            ->assertJsonStructure([
                'message',
                'user',
                'token',
                'token_type',
            ]);
    }

    public function test_user_cannot_login_with_invalid_password(): void
    {
        Role::create([
            'name' => 'Customer',
            'slug' => 'customer',
            'description' => 'User who purchases and manages event tickets.',
        ]);

        $this->postJson('/api/register', [
            'name' => 'Invalid Password User',
            'email' => 'invalid@tiketsini.test',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'invalid@tiketsini.test',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422);
    }

    public function test_authenticated_user_can_view_their_profile(): void
    {
        Role::create([
            'name' => 'Customer',
            'slug' => 'customer',
            'description' => 'User who purchases and manages event tickets.',
        ]);

        $this->postJson('/api/register', [
            'name' => 'Profile Customer',
            'email' => 'profile@tiketsini.test',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $loginResponse = $this->postJson('/api/login', [
            'email' => 'profile@tiketsini.test',
            'password' => 'password123',
        ]);

        $token = $loginResponse->json('token');

        $response = $this
            ->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/me');

        $response
            ->assertOk()
            ->assertJsonPath('user.email', 'profile@tiketsini.test')
            ->assertJsonPath('user.role.slug', 'customer');
    }

    public function test_guest_cannot_access_profile(): void
    {
        $response = $this->getJson('/api/me');

        $response->assertUnauthorized();
    }

    public function test_user_can_logout(): void
    {
        Role::create([
            'name' => 'Customer',
            'slug' => 'customer',
            'description' => 'User who purchases and manages event tickets.',
        ]);

        $registerResponse = $this->postJson('/api/register', [
            'name' => 'Logout Customer',
            'email' => 'logout@tiketsini.test',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $token = $registerResponse->json('token');

        $this->assertDatabaseCount('personal_access_tokens', 1);

        $logoutResponse = $this
            ->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/logout');

        $logoutResponse
            ->assertOk()
            ->assertJson([
                'message' => 'Logout successful.',
            ]);

        $this->assertDatabaseCount('personal_access_tokens', 0);

        $this->app['auth']->forgetGuards();

        $this
            ->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/me')
            ->assertUnauthorized();
            }
}