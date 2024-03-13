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
                <Link href="/drugs/create">Adicionar Fármaco</Link>
            )}
            <ul>
                {drugs.map(drug => (
                    <li key={drug.id}>
                        {drug.name}
                        {userHasRole('administrator') && (
                            <>
                                <Link href={`/drugs/edit/${drug.id}`}>Editar</Link>
                                <button onClick={() => deleteDrug(drug.id)}>Apagar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DrugsList;