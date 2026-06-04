<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BrandingSetting extends Model
{
    protected $table = 'branding_settings';

    protected $fillable = [
        'theme_name',
        'radius',
        'font_family',
        'logo_path',
        'favicon_path',
        'primary_color',
    ];

    public function getLogoUrlAttribute()
    {
        return $this->logo_path ? asset('storage/' . $this->logo_path) : null;
    }
}
