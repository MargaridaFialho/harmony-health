<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;

class DoctorController extends Controller
{
    public function index()
    {
        // Assuming 'doctor' is the name of the role in your roles table
        $doctorRole = Role::where('name', 'doctor')->first();
    
        if (!$doctorRole) {
            return response()->json([]);
        }
    
        // Fetch users with the 'doctor' role and select specific attributes
        $doctors = $doctorRole->users()->get(['id as user_id', 'name']);
    
        return response()->json($doctors);
    }
}
