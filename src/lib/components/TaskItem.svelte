<script>
    import {deleteTask, updateTask} from '$lib/api';
    import { toast } from '@zerodevx/svelte-toast'

    export let task;
    export let page;
    export let loadTasks;
    export let tasks;

    const deleteTaskItem = async () => {
        try {
            const response = await deleteTask(task._id);
            toast.push(response.message)
            page.set(1);
            tasks.set([]);
            await loadTasks();
        } catch (error) {
            toast.push(error.message)
        }
    };

    const toggleComplete = async () => {
        try {
            task.completed = !task.completed;
            await updateTask(task);
        } catch (error) {
            toast.push(error.message)
        }
    }
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
    <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div class="flex items-center">
            <input type="checkbox" checked={task.completed} class="mr-2" on:change={toggleComplete} />
            <h3 class="text-lg font-medium leading-6 text-gray-900">
                {task.title}
            </h3>
            <span class="ml-2 px-2 py-1 rounded-md text-sm font-semibold text-white" style="background-color: {task.completed ? '#1abc9c' : '#e67e22'}">
                {task.completed ? 'Completed' : 'Not Completed'}
            </span>
        </div>
        <button class="text-red-500 hover:text-red-700" on:click={deleteTaskItem}>
            Delete
        </button>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">{task.description}</dd>
            </div>
        </dl>
    </div>
</div>
