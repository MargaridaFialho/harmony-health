import React from 'react';

const PastAppointmentsList = ({ appointments }) => {
  return (
      <ul className="mt-2">
        {appointments.map(appointment => (
          <li key={appointment.id} className="mt-1">
            {appointment.date_time} com {appointment.doctor?.name || 'Doutor Desconhecido'}
          </li>
        ))}
      </ul>
  );
};

export default PastAppointmentsList;