import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ScheduleAppointment = ({ auth }) => {
    const { data, setData, post } = useForm({
        doctor_user_id: '',
        date_time: '',
    });

    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // State to track loading status
    const [error, setError] = useState(null); // State to track any errors

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/doctors')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDoctors(data);
                setIsLoading(false);
            })
            .catch(error => {
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
          onSuccess: (page) => {
              if (page.props.success) {
                  // Handle success
                  router.visit('/dashboard'); // Redirect to the dashboard
              }
          },
      });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Marcar uma consulta</h2>}
        >
            <div className="py-12">
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="pt-6 pb-6 pl-6 pr-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
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
                        {isLoading && <p>Loading doctors...</p>}
                        {error && <p>Error fetching doctors: {error}</p>}
                        <Link href="/dashboard" className="mt-4 inline-block text-blue-500 hover:text-blue-700">Voltar</Link>
                    </div>
                </div>
            </div> 
            </div>
        </AuthenticatedLayout>
    );
};

export default ScheduleAppointment;
