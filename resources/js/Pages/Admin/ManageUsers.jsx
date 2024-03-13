import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react'; // Import Inertia

export default function ManageUsers({ auth, errors, users, roles }) {
    const [selectedRoles, setSelectedRoles] = useState(() => {
        const initialRoles = {};
        users.forEach(user => {
            initialRoles[user.id] = user.roles[0]?.id || '';
        });
        return initialRoles;
    });

    const handleRoleChange = (userId, roleId) => {
        setSelectedRoles(prev => ({ ...prev, [userId]: roleId }));
    };

    const saveRoleChanges = (userId) => {
        router.post(route('admin.users.updateRole', { user: userId }), {
            roleId: selectedRoles[userId],
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gerir Utilizadores</h2>}
        >
            <Head title="Manage Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Papel</th>
                                        <th>Novo Papel</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.roles.map(role => role.name).join(', ')}</td>
                                            <td>
                                                <select
                                                    value={selectedRoles[user.id]}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                >
                                                    {roles.map((role) => (
                                                        <option key={role.id} value={role.id}>{role.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => saveRoleChanges(user.id)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                                >
                                                    Guardar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}