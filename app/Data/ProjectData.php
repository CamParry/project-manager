<?php

namespace App\Data;

use App\Models\Project;
use Spatie\LaravelData\Data;

/** @typescript */
class ProjectData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $content,
        public ?string $client,
        public ?string $deadline,
        public string $status,
        public int $priority,
        public string $created_at,
        public string $updated_at,
    ) {}
}
