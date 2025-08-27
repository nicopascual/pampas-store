<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input, PasswordInput } from '$lib/components/ui/input';
	import FormErrorAlert from '$lib/components/ui/form-error-alert.svelte';
	import * as m from '$lib/paraglide/messages';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { loginForm, type LoginForm } from '$lib/components/login-form/schema';

	let { data }: { data: { form: SuperValidated<Infer<LoginForm>> } } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(loginForm)
	});

	const { form: formData, enhance, message } = form;
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">{m['login.title']()}</Card.Title>
		<Card.Description>{m['login.description']()}</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			{#if $message}
				<FormErrorAlert description={$message} class="mb-4" />
			{/if}
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>{m['login.email.label']()}</Form.Label>
								<Input {...props} bind:value={$formData.email} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>{m['login.password.label']()}</Form.Label>
								<PasswordInput {...props} bind:value={$formData.password} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Button type="submit" class="w-full">{m['login.submit']()}</Form.Button>
				<Button variant="outline" class="w-full">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
							fill="currentColor"
						/>
					</svg>
					{m['login.google']()}
				</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				{m['login.signup.text']()}
				<a href="##" class="underline">{m['login.signup.link']()}</a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
