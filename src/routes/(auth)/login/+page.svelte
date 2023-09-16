<script lang="ts">
	import type { PageData } from './$types';

	import { LoginValidation as schema } from '$root/lib/validations/user';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, enhance, message, errors, constraints, delayed } = superForm(data.form, {
		customValidity: false,
		validators: schema,
		multipleSubmits: 'prevent'
	});
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="lg:container mx-auto h-[90vh] w-full p-8">
	<form method="POST" class="flex flex-col items-center w-full justify-center" use:enhance>
		<h1 class="text-heading2-semibold my-2">Login</h1>
		<p>
			Don't have an account? <a href="/sign-up" class="link font-bold!important">Sign up here.</a>
		</p>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text font-semibold">Email</span>
			</label>
			<input
				id="email"
				name="email"
				type="email"
				class="input w-full max-w-xs {$errors.email ? 'input-error' : 'input-bordered'}"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			/>
			<label for="email" class="label">
				{#if $errors.email}
					<span class="label-text-alt text-error">{$errors.email}</span>
				{/if}
			</label>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="password" class="label">
				<span class="label-text font-semibold">Password</span>
			</label>
			<input
				id="password"
				name="password"
				type="password"
				class="input w-full max-w-xs {$errors.password ? 'input-error' : 'input-bordered'}"
				aria-invalid={$errors.password ? 'true' : undefined}
				bind:value={$form.password}
				{...$constraints.password}
			/>
			<label for="password" class="label">
				{#if $errors.password}
					<span class="label-text-alt text-error">{$errors.password}</span>
				{/if}
			</label>
		</div>
		<div class="w-full max-w-xs">
			<input
				class="btn w-full rounded-3xl normal-case font-semibold text-base text-black border-none"
				type="submit"
				value={$delayed ? 'Loading...' : 'Log In'}
				disabled={$delayed}
			/>
		</div>
	</form>
	{#if $message}
		<div class="mt-10 bg-slate-50 rounded-xl p-6 shadow-lg w-fit mx-auto">
			<p class="text-lg text-center font-medium text-error">{$message}</p>
		</div>
	{/if}
</div>
