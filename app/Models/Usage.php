<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\CentralConnection;

class Usage extends Model
{
    use CentralConnection;

    protected $fillable = [
        'tenant_id',
        'tokens'
    ];
}
