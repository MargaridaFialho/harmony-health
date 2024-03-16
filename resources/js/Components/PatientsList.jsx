import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

const PatientsList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch('/api/patients')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setPatients(data))
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    return (
        <div className="flex flex-col">
            {patients.map(patient => (
                <Link key={patient.id} href={`/patients/${patient.id}`} className="text-blue-500 hover:text-blue-700 mb-2">
                    {patient.name}
                </Link>
            ))}
        </div>
    );
};

export default PatientsList;