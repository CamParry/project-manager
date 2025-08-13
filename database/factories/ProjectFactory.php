<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'client' => fake()->optional()->company(),
            'content' => fake()->optional()->paragraphs(2, true),
            'deadline' => fake()->optional()->dateTimeBetween('now', '+6 months'),
            'user_id' => \App\Models\User::factory(),
            'status_id' => \App\Models\ProjectStatus::factory(),
            'priority_id' => \App\Models\ProjectPriority::factory(),
        ];
    }
}
