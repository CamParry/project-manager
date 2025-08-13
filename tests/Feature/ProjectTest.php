<?php

use App\Models\Project;
use App\Models\ProjectPriority;
use App\Models\ProjectStatus;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

test('user can view projects index', function () {
    $response = $this->get('/projects');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('projects/index'));
});

test('user can create a new project', function () {
    $status = ProjectStatus::factory()->create();
    $priority = ProjectPriority::factory()->create();

    $response = $this->post('/projects', [
        'title' => 'Test Project',
        'client' => 'Test Client',
        'content' => 'Test content',
    ]);

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'id',
        'title',
        'client',
        'content',
        'status',
        'priority',
    ]);

    $this->assertDatabaseHas('projects', [
        'title' => 'Test Project',
        'client' => 'Test Client',
        'content' => 'Test content',
        'user_id' => $this->user->id,
    ]);
});

test('user can view their own project', function () {
    $project = Project::factory()->for($this->user)->create();

    $response = $this->get("/projects/{$project->id}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('projects/show')
        ->has('project')
        ->where('project.id', $project->id)
        ->where('project.title', $project->title)
    );
});

test('user cannot view other users project', function () {
    $otherUser = User::factory()->create();
    $project = Project::factory()->for($otherUser)->create();

    $response = $this->get("/projects/{$project->id}");

    $response->assertStatus(403);
});

test('user can update their own project', function () {
    $project = Project::factory()->for($this->user)->create();

    $response = $this->patch("/projects/{$project->id}", [
        'title' => 'Updated Title',
        'client' => 'Updated Client',
    ]);

    $response->assertStatus(200);
    $response->assertJsonFragment([
        'title' => 'Updated Title',
        'client' => 'Updated Client',
    ]);

    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'title' => 'Updated Title',
        'client' => 'Updated Client',
    ]);
});

test('user cannot update other users project', function () {
    $otherUser = User::factory()->create();
    $project = Project::factory()->for($otherUser)->create();

    $response = $this->patch("/projects/{$project->id}", [
        'title' => 'Updated Title',
    ]);

    $response->assertStatus(403);
});

test('user can delete their own project', function () {
    $project = Project::factory()->for($this->user)->create();

    $response = $this->delete("/projects/{$project->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('projects', [
        'id' => $project->id,
    ]);
});

test('user cannot delete other users project', function () {
    $otherUser = User::factory()->create();
    $project = Project::factory()->for($otherUser)->create();

    $response = $this->delete("/projects/{$project->id}");

    $response->assertStatus(403);
    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
    ]);
});

test('project validation works correctly', function () {
    $response = $this->postJson('/projects', [
        'title' => str_repeat('a', 256), // Too long
        'client' => str_repeat('b', 256), // Too long
        'status_id' => 999, // Non-existent
        'priority_id' => 999, // Non-existent
        'deadline' => 'invalid-date',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors([
        'title',
        'client', 
        'status_id',
        'priority_id',
        'deadline',
    ]);
});

test('projects api endpoint returns user projects', function () {
    // Create projects for this user
    $userProjects = Project::factory()->for($this->user)->count(3)->create();
    
    // Create project for another user (should not be returned)
    $otherUser = User::factory()->create();
    Project::factory()->for($otherUser)->create();

    $response = $this->get('/api/projects');

    $response->assertStatus(200);
    $response->assertJsonCount(3, 'projects');
    
    $projectIds = collect($response->json('projects'))->pluck('id')->sort()->values();
    $expectedIds = $userProjects->pluck('id')->sort()->values();
    
    expect($projectIds)->toEqual($expectedIds);
});

test('api returns projects with all necessary data for frontend sorting', function () {
    $highPriority = ProjectPriority::factory()->create(['level' => 3]);
    $lowPriority = ProjectPriority::factory()->create(['level' => 1]);
    
    // Create projects with different priorities and deadlines
    Project::factory()->for($this->user)->create([
        'priority_id' => $lowPriority->id,
        'deadline' => now()->addDays(5),
        'title' => 'Low Priority Later'
    ]);
    
    Project::factory()->for($this->user)->create([
        'priority_id' => $highPriority->id, 
        'deadline' => now()->addDays(1),
        'title' => 'High Priority Soon'
    ]);
    
    Project::factory()->for($this->user)->create([
        'priority_id' => $highPriority->id,
        'deadline' => now()->addDays(10),
        'title' => 'High Priority Later'
    ]);

    $response = $this->get('/api/projects');
    
    $projects = $response->json('projects');
    
    // Backend should return unsorted data with all fields needed for frontend sorting
    expect($projects)->toHaveCount(3);
    expect($projects[0])->toHaveKeys(['id', 'title', 'priority_id', 'status_id', 'deadline', 'priority', 'status']);
    expect($projects[0]['priority'])->toHaveKeys(['id', 'name', 'level']);
    expect($projects[0]['status'])->toHaveKeys(['id', 'name']);
});
