<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreMember>
 */
class StoreMemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'store_id' => \App\Models\Store::factory(),
            'user_id' => \App\Models\User::factory(),
            'role' => $this->faker->randomElement(\App\Enums\StoreMemberRole::cases()),
        ];
    }
}
