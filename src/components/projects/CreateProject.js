import React, { useState, useEffect } from 'react';
import { fetchStatusPriority, createProject } from '../../services/projectService';
import { useAuth } from '../../context/authContext';

const CreateProject = () => {
    const { accessToken } = useAuth();
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        deadline_date: '',
        status: '',
        priority: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const today = new Date().toISOString().slice(0, 16);

    useEffect(() => {
        const loadStatusPriority = async () => {
            try {
                const data = await fetchStatusPriority(accessToken);
                setStatuses(data.project_statuses);
                setPriorities(data.priority_labels);
            } catch (error) {
                setError('Error loading statuses and priorities');
            }
        };

        loadStatusPriority();
    }, [accessToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedDateTime = new Date(formData.deadline_date);
        const now = new Date();
        if (selectedDateTime < now) {
            setError('The deadline date and time cannot be earlier than the current time.');
            return;
        }

        try {
            await createProject(accessToken, formData);
            setSuccessMessage('Project created successfully');
            setFormData({
                name: '',
                description: '',
                deadline_date: '',
                status: '',
                priority: '',
            });
            setError('');
        } catch (error) {
            setError('Error creating the project');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Project</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Project Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="deadline_date" className="block text-gray-700 font-medium mb-2">
                        Deadline Date and Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="deadline_date"
                        name="deadline_date"
                        value={formData.deadline_date}
                        onChange={handleChange}
                        required
                        min={today}
                        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                        Status:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                        <option value="">Select a status</option>
                        {statuses.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="priority" className="block text-gray-700 font-medium mb-2">
                        Priority:
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                        <option value="">Select a priority</option>
                        {priorities.map((priority) => (
                            <option key={priority.id} value={priority.id}>
                                {priority.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
                >
                    Create Project
                </button>
            </form>
        </div>
    );
};

export default CreateProject;
