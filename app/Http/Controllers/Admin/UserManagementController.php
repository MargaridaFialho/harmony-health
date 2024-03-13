<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Role;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Drug;
use Inertia\Inertia;
use Exception;

class UserManagementController extends Controller
{
    public function index()
    {
        $this->authorize('manageUsers', User::class);

        $users = User::with('roles')->get();
        $roles = Role::all(); // Fetch all roles to pass to the frontend

        return Inertia::render('Admin/ManageUsers', [
            'users' => $users,
            'roles' => $roles // Pass roles to the frontend for the dropdown
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $this->authorize('manageUsers', $user);

        $request->validate([
            'roleId' => 'required|exists:roles,id',
        ]);

        $user->roles()->sync([$request->roleId]);

        $doctorRole = Role::where('name', 'doctor')->first();
        if ($doctorRole && in_array($doctorRole->id, [$request->roleId])) {
            $this->assignDoctorRole($user->id);
        }

        // Add logic for patient role
        $patientRole = Role::where('name', 'patient')->first(); // Adjust 'patient' to your actual patient role name
        if ($patientRole && in_array($patientRole->id, [$request->roleId])) {
            $this->assignPatientRole($user->id);
        }

        return response()->json(['message' => 'User role updated successfully.']);
    }

    public function assignRoleAsDoctor(Request $request)
    {
        $userId = $request->input('user_id');
        try {
            $this->assignDoctorRole($userId);
            return response()->json(['message' => 'User assigned as doctor successfully.']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to assign user as doctor.'], 500);
        }
    }

    public function assignRoleAsPatient(Request $request)
    {
        $userId = $request->input('user_id');
        try {
            $this->assignPatientRole($userId);
            return response()->json(['message' => 'Patient assigned as patient successfully.']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to assign user as patient.'], 500);
        }
    }

    public function assignDoctorRole($userId)
    {
        DB::transaction(function () use ($userId) {
            $user = User::findOrFail($userId);

            // No need to attach the doctor role here if it's already been set in updateRole
            // Just check if the user has a doctor profile and create one if not
            if (!$user->doctorProfile()->exists()) {
                Doctor::create(['user_id' => $userId]);
            }
        });
    }

    public function assignPatientRole($userId)
    {
        DB::transaction(function () use ($userId) {
            $user = User::findOrFail($userId);

            // Check if the user already has a patient profile and create one if not
            if (!$user->patientProfile()->exists()) {
                Patient::create(['user_id' => $userId]);
                // Add any additional default values or logic for new patient profiles here
            }
        });
    }

    public function manageDrugs()
    {
        return Inertia::render('Admin/Drugs');
    }

    public function viewDrugs()
    {
        $drugs = Drug::all(); // Assuming you have a Drug model to fetch drugs from the database

        return Inertia::render('Admin/Drugs', [
            'drugs' => $drugs
        ]);
    }
}