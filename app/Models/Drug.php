<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drug extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description'
    ];

    public function appointments()
    {
        return $this->belongsToMany(Appointment::class, 'prescriptions')
                    ->withPivot('dosage', 'quantity', 'instructions');
    }
}
