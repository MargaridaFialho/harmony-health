import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import DrugForm from '@/Components/DrugForm';
import { Head, router } from '@inertiajs/react';
import Modal from '@/Components/Modal'; // Assume you have a Modal component

const Drugs = ({ auth, errors }) => {
    const [drugs, setDrugs] = useState([]);
    const [editingDrug, setEditingDrug] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('/api/drugs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setDrugs(data))
        .catch(error => console.error('Error fetching drugs:', error));
    }, []);

    const userHasRole = (roleName) => {
        return auth.user.roles.some(role => role.name === roleName);
    };

    const saveDrug = (drug) => {
        if (!userHasRole('administrator')) return; // Prevent non-admins from saving drugs

        const method = drug.id ? 'patch' : 'post';
        const url = drug.id ? `/api/drugs/${drug.id}` : '/api/drugs';

        router[method](url, drug, {
            onSuccess: () => {
                setShowModal(false);
                setEditingDrug(null);
                // Refresh the list or handle the response to update the list
            },
        });
    };

    const editDrug = (drug) => {
        if (!userHasRole('administrator')) return; // Prevent non-admins from editing drugs

        setEditingDrug(drug);
        setShowModal(true);
    };

    const deleteDrug = (id) => {
        if (!userHasRole('administrator')) return; // Prevent non-admins from deleting drugs

        if (confirm('Are you sure?')) {
            router.delete(`/api/drugs/${id}`, {
                onSuccess: () => {
                    setDrugs(drugs.filter((drug) => drug.id !== id));
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{userHasRole('administrator') ? 'Gerir Fármacos' : 'Fármacos'}</h2>}
        >
            <Head title="Manage Drugs" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {userHasRole('administrator') && (
                                <div className="text-right">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowModal(true)}>Adicionar Fármaco</button>
                                </div>
                            )}
                            {showModal && (
                                <Modal show={showModal} onClose={() => setShowModal(false)}>
                                    <DrugForm drug={editingDrug} onSave={saveDrug} />
                                </Modal>
                            )}
                            {drugs.length > 0 ? (
                                <ul className="mt-4">
                                    {drugs.map((drug) => (
                                        <li key={drug.id} className="flex justify-between items-center py-2">
                                            {drug.name}
                                            {userHasRole('administrator') && (
                                                <div>
                                                    <button className="px-4 py-2 bg-yellow-500 text-white rounded mr-2" onClick={() => editDrug(drug)}>Editar</button>
                                                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => deleteDrug(drug.id)}>Apagar</button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4">No drugs found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Drugs;