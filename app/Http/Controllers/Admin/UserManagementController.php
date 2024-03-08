<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role; // Ensure you have this model if you're using a Role model
use Inertia\Inertia;

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
            'roleId' => 'required|exists:roles,id', // Validate the role ID
        ]);

        // Assuming you're sending role IDs, adjust as necessary
        $user->roles()->sync([$request->roleId]); // Sync the roles for the user

        return response()->json(['message' => 'User role updated successfully.']);
    }
}