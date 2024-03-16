import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const PatientHistory = ({ auth, appointments }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Histórico</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {appointments.map((appointment) => (
                            <div key={appointment.id} className="p-6 bg-white border-b border-gray-200">
                                <p className="text-gray-900 font-semibold">Consulta com {appointment.doctor.name} - <span className="font-normal">{appointment.date_time}</span></p>
                                <p className="text-gray-900 font-semibold mb-2">Prescrições:</p>
                                <ul className="list-disc pl-5 mt-2">
                                    {appointment.prescriptions.map((prescription) => (
                                        <li key={prescription.id} className="text-gray-700">
                                            {prescription.drug.name} - Dosagem: <span className="font-semibold">{prescription.dosage}</span>
                                            <p className="text-gray-600">Instruções: <span className="font-normal">{prescription.instructions}</span></p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PatientHistory;