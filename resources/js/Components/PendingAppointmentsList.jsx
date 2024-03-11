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
        <div>
            {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                    <div key={index} className="p-4 border-b">
                        {/* Display appointment details */}
                        <p>Date: {appointment.date_time}</p>
                        <p>Patient: {appointment.patient_name}</p>
                        {/* Buttons to confirm and cancel the appointment */}
                        <button onClick={() => handleConfirm(appointment.id)} className="mr-2">Confirm</button>
                        <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
                    </div>
                ))
            ) : (
                <p>No pending appointments.</p>
            )}
        </div>
    );
};

export default PendingAppointmentsList;