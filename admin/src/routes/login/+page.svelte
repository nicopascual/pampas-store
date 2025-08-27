<script lang="ts">
	import type { PageData } from './$types.js';
	import LoginForm from '$lib/components/login-form/login-form.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<LoginForm {data} />
</div>
