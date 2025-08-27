<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> & {
			showPassword?: boolean;
		}
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		showPassword = $bindable(false),
		class: className,
		...restProps
	}: Props = $props();

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

<div class="relative">
	<input
		bind:this={ref}
		data-slot="input"
		class={cn(
			'flex h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 pr-10 text-base shadow-xs ring-offset-background transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
			'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
			'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
			className
		)}
		type={showPassword ? 'text' : 'password'}
		bind:value
		{...restProps}
	/>
	<Button
		type="button"
		variant="ghost"
		size="sm"
		class="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
		onclick={togglePasswordVisibility}
		aria-label={showPassword ? 'Hide password' : 'Show password'}
	>
		{#if showPassword}
			<EyeOff class="h-4 w-4" />
		{:else}
			<Eye class="h-4 w-4" />
		{/if}
	</Button>
</div>
