<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantUsage extends Model
{
    protected $table = 'usages';

    protected $fillable = [
        'name',
        'tokens'
    ];
}
