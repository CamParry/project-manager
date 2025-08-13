<?php

namespace App\Data;

use Spatie\LaravelData\Data;

/** @typescript */
class ProjectSummaryData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $status,
        public int $priority,
        public ?string $deadline,
        public ?string $client,
        public string $created_at,
        public string $updated_at,
    ) {}
}
