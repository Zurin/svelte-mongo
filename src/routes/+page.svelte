<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { z } from 'zod';
    import { TaskSchema } from '$lib/validation';
    import { fetchTasks, createTask } from '$lib/api';
    import { get } from 'svelte/store';
    import TaskItem from '$lib/components/TaskItem.svelte';
    import { enhance } from '$app/forms'

    const initialLimit = 5;
    let tasks = writable([]);
    let loading = writable(false);
    let endOfPage = writable(false);
    let page = writable(1);

    let newTask = { title: '', description: '' };
    let errors = {};

    const loadTasks = async () => {
        loading.set(true);
        const $page = get(page);
        try {
            const response = await fetchTasks($page, initialLimit);
            endOfPage.set(response.length === 0);
            tasks.update(existingTasks => [...existingTasks, ...response]);
            page.update(n => n + 1);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            loading.set(false);
        }
    };

    const addTask = async () => {
        try {
            const validatedData = TaskSchema.parse(newTask);
            await createTask(validatedData);
            tasks.set([]);
            page.set(1);
            await loadTasks();
            newTask = { title: '', description: '' };
            errors = {};
        } catch (error) {
            if (error instanceof z.ZodError) {
                errors = error.format();
            }
        }
    };

    onMount(() => {
        loadTasks();
    });

    const loadMore = () => {
        loadTasks();
    };
</script>

<main class="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-4 text-center">Task Manager</h1>
    <form on:submit|preventDefault={addTask} method="POST" use:enhance action="?/create" class="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input type="text" name="title" id="title" bind:value={newTask.title} placeholder="Enter task title"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {#if errors.title}<p class="text-red-500 text-xs italic">{errors.title._errors}</p>{/if}
        </div>
        <div class="mb-6">
            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea id="description" name="description" bind:value={newTask.description} rows="3" placeholder="Enter task description"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            {#if errors.description}<p class="text-red-500 text-xs italic">{errors.description._errors}</p>{/if}
        </div>
        <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Task
            </button>
        </div>
    </form>
    <ul>
        {#each $tasks as task (task._id)}
            <TaskItem {task} {page} {loadTasks} {tasks} />
        {/each}
    </ul>
    <div class="flex justify-center mt-4">
        {#if $loading}
            <p>Loading...</p>
        {:else}
            <button on:click={loadMore} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style="{ $endOfPage || $tasks.length < 5 ? 'display: none;' : '' }">
                Load More
            </button>
        {/if}
    </div>
</main>
