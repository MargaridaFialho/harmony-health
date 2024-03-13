import React, { useState } from 'react';
import Calendar from 'react-calendar';

const AppointmentCalendar = ({ appointments, userRole }) => { 
  const appointmentDates = appointments.map(appointment => new Date(appointment.date_time).toDateString());
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && appointmentDates.includes(date.toDateString())) {
      return 'highlight';
    }
  };

  const AppointmentDetailsModal = ({ isOpen, onClose, appointments }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <h2 className="text-center text-lg font-semibold">Detalhes da Marcação</h2>
          <ul className="my-4">
            {appointments.map((appointment, index) => (
              <li key={index} className="mb-2">
                {/* Conditional rendering based on userRole */}
                {userRole === 'patient' ? (
                  <span>Consulta com {appointment.doctor ? appointment.doctor.name : 'Desconhecido '} </span>
                ) : (
                  <span>Consulta com {appointment.patient_name ? appointment.patient_name : 'Desconhecido '} </span>
                )} em {new Date(appointment.date_time).toLocaleString()} - Status: {appointment.status}
              </li>
            ))}
          </ul>
          <div className="text-center">
            <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-150">Fechar</button>
          </div>
        </div>
      </div>
    );
  };

  const onClickDay = (value) => {
    const clickedDate = value.toDateString();
    const dayAppointments = appointments.filter(appointment => 
      new Date(appointment.date_time).toDateString() === clickedDate
    );
  
    if (dayAppointments.length > 0) {
      setSelectedAppointments(dayAppointments);
      setIsModalOpen(true);
    } else {
      setSelectedAppointments([]);
    }
  };

  return (
    <div className="page-container">
      <Calendar
        tileClassName={tileClassName}
        onClickDay={onClickDay}
        className="mt-4 border-separate border-spacing-2 border-gray-200"
      />
      <AppointmentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointments={selectedAppointments}
      />
    </div>
  );
};

export default AppointmentCalendar;