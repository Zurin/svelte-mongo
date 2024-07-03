import { json } from '@sveltejs/kit';
// @ts-ignore
import { Task } from '../../../server/db';

export const GET = async (req) => {
    const page = req.url.searchParams.get('page') || 1;
    const limit = req.url.searchParams.get('limit') || 5;

    try {
        const tasks = await Task.find()
            .sort({ createdAt: -1 })
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit));

        return json(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        return json({
            status: 500,
            body: { error: 'Failed to fetch tasks.' }
        });
    }
};

// @ts-ignore
export const POST = async ({ request }) => {
    const data = await request.json();
    const task = new Task(data);
    await task.save();
    return json(task);
};
