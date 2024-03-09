import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
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
                  Inertia.visit('/dashboard'); // Redirect to the dashboard
              }
          },
      });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Schedule an Appointment</h2>}
        >
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="doctor_user_id">Médico:</label>
                    <select name="doctor_user_id" onChange={handleChange} value={data.doctor_user_id} required>
                        <option value="">Escolha um médico</option>
                        {doctors.map(doctor => (
                            <option key={doctor.user_id} value={doctor.user_id}>{doctor.name}</option>
                        ))}
                    </select>
                    </div>
                    <div>
                        <label htmlFor="date_time">Date and Time:</label>
                        <input type="datetime-local" name="date_time" onChange={handleChange} value={data.date_time} required />
                    </div>
                    <button type="submit">Schedule</button>
                </form>
                {isLoading && <p>Loading doctors...</p>}
                {error && <p>Error fetching doctors: {error}</p>}
                <Link href="/dashboard">Back to Dashboard</Link>
            </div>
        </AuthenticatedLayout>
    );
};

export default ScheduleAppointment;