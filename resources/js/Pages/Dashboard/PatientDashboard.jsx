import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useState } from 'react';
import { usePage, Head } from '@inertiajs/react';
import AppointmentCalendar from '../../Components/AppointmentCalendar';
import PastAppointmentsList from '../../Components/PastAppointmentsList';


const PatientDashboard = ({ auth }) => {
    const { appointments, userRole } = usePage().props;
    const [futureAppointments, setFutureAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    useEffect(() => {
        const now = new Date();
        setFutureAppointments(appointments.filter(appointment => new Date(appointment.date_time) > now));
        setPastAppointments(appointments
            .filter(appointment => new Date(appointment.date_time) <= now || appointment.status === 'completed')
            .sort((a, b) => new Date(b.date_time) - new Date(a.date_time)));
    }, [appointments]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Olá, {auth.user.name}!</h2>}
        >
        <Head title="Patient Dashboard" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="text-right">
                            <button onClick={() => window.location.href = route('appointments.create')} className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 border border-transparent rounded-md font-semibold text-white">Marcar Consulta</button>
                        </div>
                            <div className="bg-white shadow rounded-lg p-4">
                                <h2 className="text-xl font-semibold text-gray-800">As suas próximas consultas</h2>
                                {futureAppointments.length > 0 ? (
                                    <AppointmentCalendar appointments={futureAppointments} userRole={userRole} />
                                ) : (
                                    <p>Não tem consultas futuras.</p>
                                )}
                            </div>
                            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Consultas Passadas</h2>
                                {pastAppointments.length > 0 ? (
                                    <PastAppointmentsList appointments={pastAppointments} />
                                ) : (
                                    <p>Não tem consultas passadas.</p>
                                )}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    );
};

export default PatientDashboard;
