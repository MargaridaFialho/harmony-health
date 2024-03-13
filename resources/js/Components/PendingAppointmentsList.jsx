import React from 'react';

const PendingAppointmentsList = ({ appointments }) => {
    // Function to handle confirming an appointment
    const handleConfirm = async (appointmentId) => {
        // Send a request to the backend to update the appointment status to "scheduled"
        try {
            const response = await fetch(`/api/appointments/${appointmentId}/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include other necessary headers, such as authorization tokens
                },
                // No need to send a body for a status update, but your backend might require something
            });
            if (response.ok) {
                // Handle successful confirmation, e.g., refresh the list or show a message
                console.log('Appointment confirmed');
                window.location.reload(); // Add this line to refresh the page
            } else {
                // Handle errors, e.g., show an error message
                console.error('Failed to confirm appointment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleCancel = async (appointmentId) => {
        // Similar implementation to handleConfirm, but for canceling appointments
        try {
            const response = await fetch(`/api/appointments/${appointmentId}/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include other necessary headers
                },
                // Body if needed
            });
            if (response.ok) {
                // Handle successful cancellation
                console.log('Appointment canceled');
            } else {
                // Handle errors
                console.error('Failed to cancel appointment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    
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
                                        Patient: {appointment.patient_name}
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