<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Support\Facades\Log;
use App\Models\Role;
use Illuminate\Support\Facades\DB;


class AppointmentController extends Controller
{
    // Display a listing of appointments
    public function index()
    {
        $this->authorize('viewAny', Appointment::class);
        // Logic to retrieve appointments based on user role
        $query = Appointment::query()->with(['doctor', 'patient']);
        if (auth()->user()->role === 'patient') {
            $query->where('patient_user_id', auth()->id());
        }
        $appointments = $query->get();
        return Inertia::render('Appointments/Index', ['appointments' => $appointments]);
    }

    public function create()
    {
        $this->authorize('create', Appointment::class);

        $user = auth()->user();
        $data = [];

        // Assuming you have a Doctor model and want to list doctors in the scheduling form
        if ($user->hasRole('patient') || $user->hasRole('administrator')) {
            $data['doctors'] = Doctor::all();
        }

        // Additional logic for administrators if needed
        if ($user->hasRole('administrator')) {
            // For example, list all patients for administrators to schedule on their behalf
            $data['patients'] = Patient::all();
        }
        return Inertia::render('ScheduleAppointment', $data);
    }

    // Store a newly created appointment in storage
    public function store(Request $request)
    {
        Log::info('Attempting to create appointment', $request->all());

        // Adjusted validation rules
        $validatedData = $request->validate([
            'doctor_user_id' => [ // Assuming this is the doctor's user ID
                'required',
                Rule::exists('users', 'id')->where(function ($query) {
                    $doctorRoleId = Role::where('name', 'doctor')->first()->id; // Adjust based on your role identification
                    $query->whereExists(function ($query) use ($doctorRoleId) {
                        $query->select(DB::raw(1))
                              ->from('role_user')
                              ->whereColumn('role_user.user_id', 'users.id')
                              ->where('role_user.role_id', $doctorRoleId);
                    });
                }),
            ],
            'date_time' => 'required|date|after:now',
        ]);

        $validatedData['patient_user_id'] = auth()->id(); // Assuming the authenticated user is the patient
        $validatedData['status'] = 'pending confirmation';
        Log::info('Store appointment request:', $request->all());
        try {
            $appointment = Appointment::create([
                'doctor_user_id' => $validatedData['doctor_user_id'], // Use 'doctor_user_id' for the doctor
                'patient_user_id' => $validatedData['patient_user_id'],
                'date_time' => $validatedData['date_time'],
                'status' => $validatedData['status'],
                // Include other necessary fields
            ]);
            Log::info('Appointment created successfully', ['appointment_id' => $appointment->id]);
            return response()->json(['success' => 'Appointment created successfully.', 'appointment_id' => $appointment->id]);
        } catch (\Exception $e) {
            Log::error('Failed to create appointment', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to create appointment.'], 500);
        }
    }

    // Display the specified appointment
    public function show($id)
    {
        $appointment = Appointment::with(['doctor', 'patient'])->findOrFail($id);
        $this->authorize('view', $appointment);
        return Inertia::render('Appointments/Show', ['appointment' => $appointment]);
    }

    // Update the specified appointment in storage
    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $this->authorize('update', $appointment);

        $validatedData = $request->validate([
            'user_id' => [ // Adjust validation as shown in the store method
                'required',
                Rule::exists('users', 'id')->where(function ($query) {
                    $doctorRoleId = Role::where('name', 'doctor')->first()->id;
                    $query->whereExists(function ($query) use ($doctorRoleId) {
                        $query->select(DB::raw(1))
                              ->from('role_user')
                              ->whereColumn('role_user.user_id', 'users.id')
                              ->where('role_user.role_id', $doctorRoleId);
                    });
                }),
            ],
            'patient_user_id' => 'required|exists:patients,id',
            'date_time' => [
                'required',
                'date',
                Rule::unique('appointments')->ignore($appointment->id)->where(function ($query) use ($request) {
                    return $query->where('user_id', $request->user_id) // Adjusted to check user_id
                                 ->where('date_time', $request->date_time);
                }),
            ],
            'status' => 'required|in:confirmed,cancelled,completed',
            // Add other fields as necessary
        ]);

        $appointment->update($validatedData);
        return redirect()->route('appointments.index')->with('success', 'Appointment updated successfully.');
    }

    // Remove the specified appointment from storage
    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $this->authorize('delete', $appointment);
        $appointment->delete();
        return redirect()->route('appointments.index')->with('success', 'Appointment deleted successfully.');
    }
}