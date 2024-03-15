import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '../Components/Modal';

const ScheduledAppointmentList = ({ auth }) => {
    const [appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
    const [selectedDrug, setSelectedDrug] = useState('');

    const [drugs, setDrugs] = useState([]);

    useEffect(() => {
        fetch('/api/drugs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }
                return response.json();
            })
            .then(data => setDrugs(data))
            .catch(error => console.error('Error fetching drugs:', error));
    }, []);

    useEffect(() => {
        fetch('/api/appointments/scheduled?include=prescriptions')
            .then(response => response.json())
            .then(data => {
                setAppointments(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleOpenModal = (appointmentId) => {
        setCurrentAppointmentId(appointmentId);
        setIsModalOpen(true);
    };

    const handlePrescriptionSubmit = (e) => {
        e.preventDefault();
    
        const formData = {
            appointment_id: currentAppointmentId,
            drug_id: selectedDrug, // Assuming you're working with single drug selection
            dosage: e.target.dosage.value,
            instructions: e.target.instructions.value,
        };
    
        fetch(`/api/prescriptions`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setIsModalOpen(false); // Close the modal
        
            // Update the appointments state to include the new prescription
            setAppointments(appointments => appointments.map(appointment => {
                if (appointment.id === currentAppointmentId) {
                    // Ensure the response includes the full prescription data, including the drug details
                    const updatedPrescriptions = [...appointment.prescriptions, {...data, drug: data.drug || {name: 'Unknown'}}];
                    return { ...appointment, prescriptions: updatedPrescriptions };
                }
                return appointment;
            }));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleDrugSelectionChange = (e) => {
        setSelectedDrug(e.target.value);
    };

    const completeAppointment = (appointmentId) => {
        fetch(`/api/appointments/${appointmentId}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include other headers as needed, like authorization tokens
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Appointment completed:', data);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Consultas e prescrições</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    {appointments
                        .slice() // Create a shallow copy to avoid mutating the original state directly
                        .sort((a, b) => new Date(a.date_time) - new Date(b.date_time)) // Sort appointments in ascending order by date_time
                        .map((appointment) => (
                            <div key={appointment.id} className="pt-6 pb-6 pl-6 pr-6 bg-white border-b border-gray-200">
                                <p className="text-sm font-medium text-gray-900">{appointment.patient.name} - {appointment.date_time}</p>
                                {/* Display prescriptions */}
                                {Array.isArray(appointment.prescriptions) && appointment.prescriptions.length > 0 ? (
                                    <ul>
                                        {appointment.prescriptions.map((prescription) => (
                                            <li key={prescription.id}>
                                                {prescription.drug?.name ?? 'Unknown Drug'} - Dosagem: {prescription.dosage} - Instruções: {prescription.instructions}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Ainda sem prescrições.</p>
                                )}
                                <button onClick={() => handleOpenModal(appointment.id)} className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                                    Prescrição
                                </button>
                                <button onClick={() => completeAppointment(appointment.id)} className="mt-2 ml-auto inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none float-right">
                                    Concluir consulta
                                </button>
                            </div>
                    ))}
                    </div>
                </div>
            </div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
                <form onSubmit={handlePrescriptionSubmit} className="p-6">
                    <div className="mb-5">
                        <label htmlFor="drug_selection" className="block text-base font-semibold text-gray-800">Fármacos</label>
                        <select
                        id="drug_selection"
                        name="drugs"
                        value={selectedDrug}
                        onChange={handleDrugSelectionChange}
                        className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        <option disabled value="">Selecione um fármaco</option>
                        {drugs.map((drug) => (
                            <option key={drug.id} value={drug.id}>{drug.name}</option>
                        ))}
                    </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="dosage" className="block text-base font-semibold text-gray-800">Dosagem</label>
                        <input
                            type="text"
                            name="dosage"
                            id="dosage"
                            required
                            className="mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-base border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="instructions" className="block text-base font-semibold text-gray-800">Instruções</label>
                        <textarea
                            name="instructions"
                            id="instructions"
                            rows="3"
                            required
                            className="mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-base border-gray-300 rounded-lg"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Prescrever
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default ScheduledAppointmentList;