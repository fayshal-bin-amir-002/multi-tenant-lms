<?php

namespace App\Tenancy;

use App\Models\Tenant;
use Stancl\Tenancy\Contracts\UniqueIdentifierGenerator;
use Illuminate\Support\Str;

class SchoolIdGenerator implements UniqueIdentifierGenerator
{
    public static function generate($resource): string
    {
        $schoolName = $resource->school_name ?? 'school';
        $slug = Str::slug($schoolName, '_');

        $baseId = "{$slug}";

        $finalId = $baseId;

        while (Tenant::where('id', $finalId)->exists()) {
            $randomSuffix = strtoupper(Str::random(4));
            $finalId = "{$baseId}_{$randomSuffix}";
        }

        return $finalId;
    }
}
