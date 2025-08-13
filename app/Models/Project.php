<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'status',
        'priority',
        'client',
        'deadline',
    ];

    protected $casts = [
        'deadline' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function statuses(): array
    {
        return [
            'not-started',
            'in-progress',
            'waiting',
            'on-hold',
            'cancelled',
            'completed',
        ];
    }

    public static function defaultStatus(): string
    {
        return 'not-started';
    }

    public static function priorities(): array
    {
        return [
            1,
            2,
            3,
            4
        ];
    }

    public static function defaultPriority(): int
    {
        return 4;
    }

    public static function summaryColumns(): array
    {
        return [
            'id',
            'title',
            'deadline',
            'status',
            'priority',
            'created_at',
            'updated_at',
        ];
    }
}
