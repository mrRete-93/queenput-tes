<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Validasi hanya untuk name & email.
     *
     * FIX: 'role' SENGAJA tidak dimasukkan ke sini karena:
     * - Update role punya otorisasi berbeda (hanya owner)
     * - Mencegah user biasa mengubah role sendiri lewat request ini
     * - Role dihandle terpisah di ProfileController::updateRole()
     */
    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}