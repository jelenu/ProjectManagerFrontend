const API_URL = 'http://192.168.1.14:8000';

// Obtener datos de estados y prioridades
export const fetchStatusPriority = async (accessToken) => {
    try {
        const response = await fetch(`${API_URL}/status_priority/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener estados y prioridades');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Crear un nuevo proyecto
export const createProject = async (accessToken, projectData) => {
    try {
        const response = await fetch(`${API_URL}/create_project/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}`,
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            throw new Error('Error al crear el proyecto');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
