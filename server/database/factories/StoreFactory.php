<?php

namespace Database\Factories;

use App\Enums\StorePlan;
use App\Enums\StoreStatus;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->company();

        return [
            'name' => $name,
            'slug' => Str::slug($name).'-'.fake()->randomNumber(3),
            'owner_id' => User::factory(),
            'domain' => fake()->optional(0.3)->domainName(),
            'plan' => fake()->randomElement(StorePlan::cases()),
            'status' => fake()->randomElement(StoreStatus::cases()),
        ];
    }

    /**
     * Create a store with Free plan.
     */
    public function free(): static
    {
        return $this->state(fn (array $attributes) => [
            'plan' => StorePlan::Free,
        ]);
    }

    /**
     * Create a store with Pro plan.
     */
    public function pro(): static
    {
        return $this->state(fn (array $attributes) => [
            'plan' => StorePlan::Pro,
        ]);
    }

    /**
     * Create a store with Enterprise plan.
     */
    public function enterprise(): static
    {
        return $this->state(fn (array $attributes) => [
            'plan' => StorePlan::Enterprise,
        ]);
    }

    /**
     * Create an active store.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => StoreStatus::Active,
        ]);
    }

    /**
     * Create a suspended store.
     */
    public function suspended(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => StoreStatus::Suspended,
        ]);
    }

    /**
     * Create a store with custom domain.
     */
    public function withCustomDomain(): static
    {
        return $this->state(fn (array $attributes) => [
            'domain' => fake()->domainName(),
        ]);
    }
}
