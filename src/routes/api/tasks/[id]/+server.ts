import { json } from '@sveltejs/kit';
import { Task } from '../../../../server/db';

export const GET = async ({ params }) => {
    const task = await Task.findById(params.id);
    return json(task);
};

export const PATCH = async ({ request, params }) => {
    const data = await request.json();
    const task = await Task.findByIdAndUpdate(params.id, data);
    return json(task);
};

export const DELETE = async ({ params }) => {
    await Task.findByIdAndDelete(params.id);
    return json({ message: 'Task deleted' });
};
