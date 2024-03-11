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
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Appointment Details</h2>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index}>
                {/* Conditional rendering based on userRole */}
                {userRole === 'patient' ? (
                  <>Appointment with Doctor {appointment.doctor ? appointment.doctor.name : 'Unknown '} </>
                ) : (
                  <>Appointment with Patient {appointment.patient_name ? appointment.patient_name : 'Unknown '} </>
                )} on {new Date(appointment.date_time).toLocaleString()} - Status: {appointment.status}
              </li>
            ))}
          </ul>
          <button onClick={onClose}>Close</button>
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