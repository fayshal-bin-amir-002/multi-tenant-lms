<?php

namespace App\Imports;

use App\Enums\TenantRole;
use App\Models\TenantUser;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithValidation;

class TenantUsersImport implements ToCollection, WithChunkReading, WithHeadingRow, WithValidation, WithMapping
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $user = TenantUser::create([
                'name'     => $row['name'],
                'email'    => $row['email'],
                'password' => Hash::make('111111'),
            ]);

            $user->assignRole($row['role']);
        }
    }

    public function map($row): array
    {
        $roleValue = isset($row['role']) ? Str::lower(trim($row['role'])) : 'student';
        return [
            'name'  => $row['name'],
            'email' => $row['email'],
            'role'  => $roleValue,
        ];
    }

    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'role'  => ['nullable', 'string', new Enum(TenantRole::class)],
        ];
    }

    public function customValidationMessages()
    {
        return [
            'name.required'  => 'Row :attribute: Name is missing.',
            'email.required' => 'Row :attribute: Email is required.',
            'email.unique'   => 'Row :attribute: This email is already registered.',
            'role.Illuminate\Validation\Rules\Enum' => 'Row :attribute: Invalid role. Use admin, teacher, or student.',
        ];
    }

    public function chunkSize(): int
    {
        return 1000;
    }
}
