import React from 'react';
import { usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AppointmentCalendar from '../../Components/AppointmentCalendar';
import PendingAppointmentsList from '../../Components/PendingAppointmentsList';

const DoctorDashboard = () => {
    const { auth, confirmedAppointments, pendingAppointments, userRole } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Olá, Dr. {auth.user.name}!</h2>}
        >
            <Head title="Doctor Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <AppointmentCalendar appointments={confirmedAppointments} userRole={userRole} />
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold text-gray-800">Confirmações Pendentes</h2>
                                {pendingAppointments.length > 0 ? (
                                    <PendingAppointmentsList initialAppointments={pendingAppointments} />
                                ) : (
                                    <p>Não existem marcações para aprovar.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DoctorDashboard;