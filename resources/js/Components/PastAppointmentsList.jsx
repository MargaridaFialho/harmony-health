import React from 'react';

const PastAppointmentsList = ({ appointments }) => {
  return (
      <ul className="mt-2">
        {appointments.map(appointment => (
          <li key={appointment.id} className="mt-1">
            {appointment.date_time} with {appointment.doctor?.name || 'Unknown Doctor'}
          </li>
        ))}
      </ul>
  );
};

export default PastAppointmentsList;