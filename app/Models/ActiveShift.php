<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActiveShift extends Model
{
    protected $fillable = ['user_id', 'name', 'session', 'date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}