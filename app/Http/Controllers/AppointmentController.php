<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // Display a listing of appointments
    public function index()
    {
        $appointments = Appointment::with(['doctor', 'patient'])->get();
        return response()->json($appointments);
    }

    // Store a newly created appointment in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'appointment_number' => 'required|unique:appointments',
            'date_time' => 'required|date',
            'status' => 'required|in:confirmed,cancelled,completed',
            // Add other fields as necessary
        ]);

        $appointment = Appointment::create($validatedData);
        return response()->json($appointment, 201);
    }

    // Display the specified appointment
    public function show($id)
    {
        $appointment = Appointment::with(['doctor', 'patient'])->find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
        return response()->json($appointment);
    }

    // Update the specified appointment in storage
    public function update(Request $request, $id)
    {
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $validatedData = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'appointment_number' => 'required|unique:appointments,appointment_number,' . $id,
            'date_time' => 'required|date',
            'status' => 'required|in:confirmed,cancelled,completed',
            // Add other fields as necessary
        ]);

        $appointment->update($validatedData);
        return response()->json($appointment);
    }

    // Remove the specified appointment from storage
    public function destroy($id)
    {
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
        $appointment->delete();
        return response()->json(['message' => 'Appointment deleted successfully']);
    }
}