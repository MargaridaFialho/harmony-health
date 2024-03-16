import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function AdminDashboard() {
    const { auth } = usePage().props;

    const { data, setData, post } = useForm({
        patient_user_id: '',
        doctor_user_id: '',
        date_time: '',
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetch('/api/patients').then(res => res.json()),
            fetch('/api/doctors').then(res => res.json()),
        ]).then(([patientsData, doctorsData]) => {
            setPatients(patientsData);
            setDoctors(doctorsData);
            setIsLoading(false);
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form', data);
        post('/appointments', data, {
            onSuccess: () => {
                // Redirect or show success message
            },
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth} 
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard do Administrador</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800">Agendar uma Consulta</h2>
                            <form onSubmit={handleSubmit}>
                                {/* Patient Selector */}
                                <div>
                                    <label htmlFor="patient_user_id">Paciente:</label>
                                    <select name="patient__user_id" onChange={handleChange} value={data.patient_id} required className="mt-1 block w-full">
                                        <option value="">Escolha um paciente</option>
                                        {patients.map(patient => (
                                            <option key={patient.id} value={patient.id}>{patient.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                <label htmlFor="doctor_user_id">Médico:</label>
                                <select name="doctor_user_id" onChange={handleChange} value={data.doctor_user_id} required className="mt-1 block w-full">
                                    <option value="">Escolha um médico</option>
                                    {doctors.map(doctor => (
                                        <option key={doctor.user_id} value={doctor.user_id}>{doctor.name}</option>
                                    ))}
                                </select>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="date_time">Data e Hora:</label>
                                    <input type="datetime-local" name="date_time" onChange={handleChange} value={data.date_time} required className="mt-1 block w-full" />
                                </div>
                                <button type="submit" className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 border border-transparent rounded-md font-semibold text-white">Marcar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default AdminDashboard;