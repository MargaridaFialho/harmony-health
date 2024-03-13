import React, { useState } from 'react';

const DrugForm = ({ drug = {}, onSave }) => {
    const [name, setName] = useState(drug?.name ?? '');
    const [description, setDescription] = useState(drug?.description ?? '');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving drug:', { ...drug, name, description }); // Add this line to debug
        onSave({ ...drug, name, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <label htmlFor="name">Name:</label>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <label htmlFor="description">Description:</label>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
            </div>
        </form>
    );
};

export default DrugForm;