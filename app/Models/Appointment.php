<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'doctor_user_id', 'patient_user_id', 'appointment_number', 'date_time', 'status'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($appointment) {
            // Generate a unique appointment number
            $appointment->appointment_number = Appointment::generateUniqueAppointmentNumber();
        });
    }

    public static function generateUniqueAppointmentNumber()
    {
        do {
            $number = random_int(100000, 999999); // Example generation logic
        } while (Appointment::where('appointment_number', $number)->exists());

        return $number;
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_user_id');
    }

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_user_id');
    }

    public function drugs()
    {
        return $this->belongsToMany(Drug::class, 'prescriptions')
                    ->withPivot('dosage', 'quantity', 'instructions');
    }
}
