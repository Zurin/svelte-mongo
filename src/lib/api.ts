import Task from "../server/models/Task";

export const fetchTasks = async (page: number, limit: number) => {
    const response = await fetch(`/api/tasks?page=${page}&limit=${limit}`);
    return await response.json();
};

export const createTask = async (task: { title: string; description: string; }) => {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

export const deleteTask = async (taskId: string) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}

export const updateTask = async (task: { _id: string; }) => {
    const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
}
