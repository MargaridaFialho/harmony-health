import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const DrugsList = () => {
    const { auth } = usePage().props;
    const [drugs, setDrugs] = useState([]);

    useEffect(() => {
        fetch('/api/drugs')
            .then(response => response.json())
            .then(data => setDrugs(data));
    }, []);

    // Helper function to check if the user has a specific role
    const userHasRole = (roleName) => {
        return auth.user.roles.some(role => role.name === roleName);
    };

    return (
        <div>
            <h1>Fármacos Disponiveis</h1>
            {userHasRole('administrator') && (
                <Link href="/drugs/create" className="text-blue-500 hover:text-blue-700">Adicionar Fármaco</Link>
            )}
            <ul className="list-disc pl-5">
                {drugs.map(drug => (
                    <li key={drug.id} className="border p-2 rounded-md mb-2 shadow-sm outline outline-1 outline-gray-300">
                        {drug.name}
                        {userHasRole('administrator') && (
                            <div className="flex justify-between items-center">
                                <Link href={`/drugs/edit/${drug.id}`} className="text-green-500 hover:text-green-700">Editar</Link>
                                <button onClick={() => deleteDrug(drug.id)} className="text-red-500 hover:text-red-700">Apagar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DrugsList;