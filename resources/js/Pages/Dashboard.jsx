import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import DoctorDashboard from './Dashboard/DoctorDashboard';
import PatientDashboard from './Dashboard/PatientDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';

export default function Dashboard({ auth }) {
    // Helper function to determine the user's role and render the corresponding dashboard
    const renderRoleSpecificDashboard = () => {
        if (auth.user.roles.some(role => role.name === 'doctor')) {
            return <DoctorDashboard />;
        } else if (auth.user.roles.some(role => role.name === 'patient')) {
            return <PatientDashboard />;
        } else if (auth.user.roles.some(role => role.name === 'administrator')) {
            return <AdminDashboard />;
        }
        // Default message if no specific role is found
        return <div>You're logged in, but we couldn't determine your role.</div>;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {renderRoleSpecificDashboard()}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}