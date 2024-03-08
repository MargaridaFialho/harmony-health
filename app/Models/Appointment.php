<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'doctor_id', 'patient_id', 'appointment_number', 'date_time', 'status'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function drugs()
    {
        return $this->belongsToMany(Drug::class, 'prescriptions')
                    ->withPivot('dosage', 'quantity', 'instructions');
    }
}
