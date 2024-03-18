import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const PendingAppointmentsList = ({ initialAppointments }) => {
    const [appointments, setAppointments] = useState(initialAppointments);

    // Function to fetch updated list of appointments
    const fetchAppointments = async () => {
        try {
            const response = await fetch('/api/appointments/pending', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // If using a different authentication method, include the necessary header here
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const data = await response.json();
            setAppointments(data); // Update the appointments state with the fetched data
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while fetching appointments');
        }
    };

    // Function to handle confirming an appointment
    const handleConfirm = async (appointmentId) => {
        try {
            const response = await fetch(`/api/appointments/${appointmentId}/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                toast.success('Marcarção confirmada!');
                fetchAppointments(); // Refresh the appointments list
            } else {
                toast.error('Failed to confirm appointment');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while confirming the appointment');
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            const response = await fetch(`/api/appointments/${appointmentId}/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include other necessary headers, such as authorization tokens
                },
            });
            if (response.ok) {
                toast.success('Marcação cancelada!');
                fetchAppointments(); // Refresh the appointments list
            } else {
                toast.error('Failed to cancel appointment');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while canceling the appointment');
        }
    };

    // Optionally, you can use useEffect to fetch appointments when the component mounts
    useEffect(() => {
        fetchAppointments();
    }, []);
    
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {appointments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {appointments.map((appointment, index) => (
                        <li key={index} className="px-4 py-4 flex items-center sm:px-6">
                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-indigo-600 truncate">Date: {appointment.date_time}</p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                        {/* Display appointment details */}
                                        Paciente: {appointment.patient?.name}
                                    </p>
                                </div>
                                <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                                    <div className="flex overflow-hidden -space-x-1">
                                        {/* Buttons to confirm and cancel the appointment */}
                                        <button onClick={() => handleConfirm(appointment.id)} className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Confirmar</button>
                                        <button onClick={() => handleCancel(appointment.id)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-4">
                    <p className="text-sm text-gray-500">Sem marcações pendentes.</p>
                </div>
            )}
        </div>
    );
};

export default PendingAppointmentsList;