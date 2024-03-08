<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $user->load('roles'); // Assuming you have the roles relationship set up

        // You can add more logic here to customize the data based on the user's role

        return Inertia::render('Dashboard', [
            'user' => $user->load('roles'),
        ]);
    }
}