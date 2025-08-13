<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'string|max:255',
            'content' => 'string',
            'status' => ['string', Rule::in(Project::statuses())],
            'priority' => ['integer', Rule::in(Project::priorities())],
            'client' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
        ];
    }
}
