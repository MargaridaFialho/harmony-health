import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const PatientDetailsPage = ({ auth }) => {
    const { props } = usePage();
    const { id } = props;
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch all patients
        fetch('/api/patients')
            .then(response => response.json())
            .then(data => {
                // Find the specific patient by ID
                const foundPatient = data.find(p => p.id.toString() === id);
                setPatient(foundPatient);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));

        // Fetch patient's appointment history including prescriptions
        fetch(`/api/patient/${id}/appointments`)
        .then(response => response.json())
        .then(data => {
            const sortedAppointments = data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
            setAppointments(sortedAppointments);
        })
        .catch(error => console.error("Failed to fetch appointments:", error));
    }, [id]);

    if (!patient) return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            A carregar...
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalhes do {patient.name}</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Histórico de Consultas</h2>
                            {appointments.length > 0 ? (
    <ul className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
            <li key={appointment.id} className="py-4">
                <span className="text-sm font-medium text-gray-500">{appointment.date_time}</span> - 
                <span className="text-sm text-gray-700">{appointment.status}</span>
                <ul className="mt-2">
                    {appointment.prescriptions.length > 0 ? (
                        appointment.prescriptions.map((prescription) => (
                            <li key={prescription.id} className="text-sm text-gray-500">
                                Prescrição: {prescription.drug.name} - Dosagem: {prescription.dosage} - Instruções: {prescription.instructions}
                            </li>
                        ))
                    ) : (
                        <li className="text-sm text-gray-500">Sem prescrições.</li>
                    )}
                </ul>
            </li>
        ))}
    </ul>
) : (
    <p className="text-sm text-gray-500">Sem consultas disponíveis.</p>
)}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PatientDetailsPage;

