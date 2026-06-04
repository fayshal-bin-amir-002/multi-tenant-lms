<?php

namespace App\Enums;

enum TenantRole: string
{
    case Admin = 'admin';
    case Teacher = 'teacher';
    case Student = 'student';
}
