<?php

namespace App\Http\Controllers;

use App\Data\ProjectData;
use App\Data\ProjectSummaryData;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = $request->user()->projects()
            ->select(Project::summaryColumns())
            ->get();

        return Inertia::render('projects/index', [
            'projects' => $projects->map(fn($project) => ProjectSummaryData::from($project)),
        ]);
    }

    public function apiIndex(Request $request)
    {
        $projects = $request->user()->projects()
            ->select(Project::summaryColumns())
            ->get();

        return response()->json([
            'projects' => $projects->map(fn($project) => ProjectSummaryData::from($project)),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $project = Project::create([
            ...$request->validated(),
            'user_id' => $request->user()->id
        ]);

        return response()->json(ProjectData::from($project));
    }

    public function show(Request $request, Project $project)
    {
        $this->authorize('view', $project);

        $projects = $request->user()->projects()
            ->select(Project::summaryColumns())
            ->get();

        return Inertia::render('projects/show', [
            'project' => ProjectData::from($project),
            'projects' => $projects->map(fn($p) => ProjectSummaryData::from($p)),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);

        $project->update($request->validated());
        $project->refresh();

        return response()->json(ProjectData::from($project));
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        if (request()->header('X-Inertia')) {
            return redirect()->route('projects.index');
        }

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
