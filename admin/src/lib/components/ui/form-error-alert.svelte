<script lang="ts">
	import { X } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	let {
		description,
		onDismiss,
		class: className,
		...restProps
	}: {
		description?: string;
		onDismiss?: () => void;
		class?: string;
	} = $props();
</script>

<div
	class={cn('flex items-start gap-2 rounded-md border border-red-100 bg-red-50 p-4', className)}
	{...restProps}
>
	<div class="flex flex-1 flex-col gap-2">
		<p class="text-sm text-destructive">{description}</p>
	</div>
	{#if onDismiss}
		<button
			type="button"
			onclick={onDismiss}
			class="flex h-5 w-5 items-center justify-center text-gray-500 hover:text-gray-700"
		>
			<X class="h-3.5 w-3.5" />
		</button>
	{/if}
</div>
