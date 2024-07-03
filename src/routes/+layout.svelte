<script>
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import '../lib/styles/global.css';

    const options = {}
</script>

<slot />
<SvelteToast {options} />
