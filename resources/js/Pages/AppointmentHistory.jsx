import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function AppointmentHistory() {
    const { auth } = usePage().props;
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('/api/appointments/all')
            .then(response => response.json())
            .then(data => {
                // Sort appointments by date_time in descending order to show the most recent first
                const sortedAppointments = data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
                setAppointments(sortedAppointments);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Histórico</h3>
                    <ul className="divide-y divide-gray-200">
                        {appointments.map((appointment, index) => (
                            <li key={index} className="px-4 py-4 sm:px-0">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium text-indigo-600">
                                        Date: {appointment.date_time}
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            appointment.status === 'pending confirmation' ? 'bg-red-100 text-red-800' :
                                            appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                            appointment.status === 'canceled' ? 'bg-gray-100 text-gray-800' :
                                            'bg-green-100 text-green-800'}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <div className="text-sm text-gray-500">
                                            Prescrições: 
                                            <ul>
                                                {appointment.prescriptions.map(prescription => 
                                                    <li key={prescription.id}>Fármaco: {prescription.drug.name}, Dosagem: {prescription.dosage}, Instruções: {prescription.instructions}</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                        <p>Paciente: {appointment.patient.name}</p>
                                        <p className="ml-4">Médico: {appointment.doctor.name}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default AppointmentHistory;