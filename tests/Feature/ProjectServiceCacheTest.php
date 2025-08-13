<?php

use App\Services\ProjectService;
use App\Models\ProjectStatus;
use App\Models\ProjectPriority;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    $this->service = new ProjectService();
});

test('statuses are cached and cache is invalidated on model changes', function () {
    // Clear any existing cache
    Cache::forget('project_statuses');
    
    // Create initial status
    $status = ProjectStatus::create(['name' => 'Test Status']);
    
    // First call should hit database and cache result
    $statuses1 = $this->service->getAllStatuses();
    expect($statuses1)->toHaveCount(1);
    
    // Second call should use cache
    $statuses2 = $this->service->getAllStatuses();
    expect($statuses2)->toHaveCount(1);
    
    // Create another status - cache should be invalidated by observer
    ProjectStatus::create(['name' => 'Another Status']);
    
    // Next call should hit database again and get updated data
    $statuses3 = $this->service->getAllStatuses();
    expect($statuses3)->toHaveCount(2);
});

test('priorities are cached and cache is invalidated on model changes', function () {
    // Clear any existing cache
    Cache::forget('project_priorities');
    
    // Create initial priority
    $priority = ProjectPriority::create(['name' => 'Test Priority', 'level' => 1]);
    
    // First call should hit database and cache result
    $priorities1 = $this->service->getAllPriorities();
    expect($priorities1)->toHaveCount(1);
    
    // Second call should use cache
    $priorities2 = $this->service->getAllPriorities();
    expect($priorities2)->toHaveCount(1);
    
    // Create another priority - cache should be invalidated by observer
    ProjectPriority::create(['name' => 'Another Priority', 'level' => 2]);
    
    // Next call should hit database again and get updated data
    $priorities3 = $this->service->getAllPriorities();
    expect($priorities3)->toHaveCount(2);
});

test('cache is invalidated when status is updated', function () {
    Cache::forget('project_statuses');
    
    $status = ProjectStatus::create(['name' => 'Original Name']);
    
    // Cache the result
    $this->service->getAllStatuses();
    
    // Update the status - should invalidate cache via observer
    $status->update(['name' => 'Updated Name']);
    
    // Next call should get fresh data
    $statuses = $this->service->getAllStatuses();
    expect($statuses->first()->name)->toBe('Updated Name');
});

test('cache is invalidated when status is deleted', function () {
    Cache::forget('project_statuses');
    
    $status = ProjectStatus::create(['name' => 'To Delete']);
    
    // Cache the result
    $statuses1 = $this->service->getAllStatuses();
    expect($statuses1)->toHaveCount(1);
    
    // Delete the status - should invalidate cache via observer
    $status->delete();
    
    // Next call should get fresh data
    $statuses2 = $this->service->getAllStatuses();
    expect($statuses2)->toHaveCount(0);
});

test('priorities are ordered by level descending', function () {
    Cache::forget('project_priorities');
    
    ProjectPriority::create(['name' => 'Low', 'level' => 1]);
    ProjectPriority::create(['name' => 'High', 'level' => 3]);
    ProjectPriority::create(['name' => 'Medium', 'level' => 2]);
    
    $priorities = $this->service->getAllPriorities();
    
    expect($priorities->pluck('level')->toArray())->toBe([3, 2, 1]);
    expect($priorities->pluck('name')->toArray())->toBe(['High', 'Medium', 'Low']);
});