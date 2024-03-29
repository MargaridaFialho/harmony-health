<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;
use App\Models\Appointment;

class PrescriptionController extends Controller
{
    // Display a listing of prescriptions
    public function index()
    {
        $prescriptions = Prescription::with(['drug', 'appointment'])->get();
        return response()->json($prescriptions);
    }

    // Store a newly created prescription in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'drug_id' => 'required|exists:drugs,id',
            'dosage' => 'required|string',
            'instructions' => 'nullable|string',
        ]);

        $prescription = Prescription::create([
            'appointment_id' => $validatedData['appointment_id'],
            'drug_id' => $validatedData['drug_id'],
            'dosage' => $validatedData['dosage'],
            'instructions' => $validatedData['instructions'],
        ]);

        // Load the drug relationship to include drug details in the response
        $prescription->load('drug');

        return response()->json($prescription, 201);
    }

    // Display the specified prescription
    public function show($id)
    {
        $prescription = Prescription::with(['drug', 'appointment'])->find($id);
        if (!$prescription) {
            return response()->json(['message' => 'Prescription not found'], 404);
        }
        return response()->json($prescription);
    }

    // Update the specified prescription in storage
    public function update(Request $request, $id)
    {
        $prescription = Prescription::find($id);
        if (!$prescription) {
            return response()->json(['message' => 'Prescription not found'], 404);
        }

        $validatedData = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'drug_id' => 'required|exists:drugs,id',
            'dosage' => 'required|string',
            'quantity' => 'required|integer',
            'instructions' => 'nullable|string',
        ]);

        $prescription->update($validatedData);
        return response()->json($prescription);
    }

    // Remove the specified prescription from storage
    public function destroy($id)
    {
        $prescription = Prescription::find($id);
        if (!$prescription) {
            return response()->json(['message' => 'Prescription not found'], 404);
        }
        $prescription->delete();
        return response()->json(['message' => 'Prescription deleted successfully']);
    }

    public function scheduledAppointments()
    {
        $includePrescriptions = request()->query('include') === 'prescriptions';
    
        $scheduledAppointments = Appointment::scheduled()->with(['patient', 'doctor']);
    
        if ($includePrescriptions) {
            $scheduledAppointments = $scheduledAppointments->with('prescriptions.drug');
        }
    
        return response()->json($scheduledAppointments->get());
    }
}