import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

const config = {
	kit: {
		adapter: adapter(), // Replace with appropriate adapter for your deployment target
		// Other kit options like files, vite, etc.
	},
	preprocess: preprocess(),
};

export default config;
