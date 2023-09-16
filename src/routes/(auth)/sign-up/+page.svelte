<script lang="ts">
	import type { PageData } from './$types';

	import { SignUpValidation as schema } from '$root/lib/validations/user';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, enhance, message, errors, constraints, delayed } = superForm(data.form, {
		customValidity: false,
		validators: schema,
		multipleSubmits: 'prevent'
	});
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<div class="lg:container mx-auto pt-[5%] h-[90vh] w-full p-8">
	<form method="POST" class="flex flex-col items-center w-full justify-center" use:enhance>
		<h1 class="text-heading2-semibold my-2">Sign Up</h1>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text font-semibold">Email</span>
			</label>
			<input
				id="email"
				name="email"
				type="email"
				autocomplete="email"
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
			<label for="username" class="label">
				<span class="label-text font-semibold">Username</span>
			</label>
			<input
				id="username"
				name="username"
				type="text"
				autocomplete="username"
				class="input w-full max-w-xs {$errors.username ? 'input-error' : 'input-bordered'}"
				aria-invalid={$errors.username ? 'true' : undefined}
				bind:value={$form.username}
				{...$constraints.username}
			/>
			<label for="email" class="label">
				{#if $errors.username}
					<span class="label-text-alt text-error">{$errors.username}</span>
				{/if}
			</label>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="name" class="label">
				<span class="label-text font-semibold">Name</span>
			</label>
			<input
				id="name"
				name="name"
				type="text"
				autocomplete="name"
				class="input w-full max-w-xs {$errors.name ? 'input-error' : 'input-bordered'}"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
			<label for="email" class="label">
				{#if $errors.name}
					<span class="label-text-alt text-error">{$errors.name}</span>
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
				autocomplete="current-password"
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
		<div class="form-control w-full max-w-xs">
			<label for="confirmPassword" class="label">
				<span class="label-text font-semibold">Confirm Password</span>
			</label>
			<input
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				autocomplete="current-password"
				class="input w-full max-w-xs {$errors.confirmPassword ? 'input-error' : 'input-bordered'}"
				aria-invalid={$errors.confirmPassword ? 'true' : undefined}
				bind:value={$form.confirmPassword}
				{...$constraints.confirmPassword}
			/>
			<label for="passwordConfirm" class="label">
				{#if $errors.confirmPassword}
					<span class="label-text-alt text-error">{$errors.confirmPassword}</span>
				{/if}
			</label>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="bio" class="label">
				<span class="label-text font-semibold">Bio</span>
			</label>
			<textarea
				id="bio"
				name="bio"
				class="input flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-small-regular ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800 max-w-xs {$errors.bio
					? 'input-error'
					: 'input-bordered'}"
				aria-invalid={$errors.bio ? 'true' : undefined}
				bind:value={$form.bio}
				{...$constraints.bio}
			/>
			<label for="email" class="label">
				{#if $errors.bio}
					<span class="label-text-alt text-error">{$errors.bio}</span>
				{/if}
			</label>
		</div>
		<div class="form-control w-full max-w-xs pb-2">
			<label class="label cursor-pointer justify-start space-x-4">
				<input
					id="terms"
					name="terms"
					type="checkbox"
					class="checkbox {$errors.terms ? 'border-error' : ''}"
					aria-invalid={$errors.terms ? 'true' : undefined}
					bind:value={$form.terms}
					{...$constraints.terms}
				/>
				<span class="label-text font-semibold">I accept the terms and conditions</span>
			</label>
			<label for="terms" class="label">
				{#if $errors.terms}
					<span class="label-text-alt text-error">{$errors.terms}</span>
				{/if}
			</label>
		</div>
		<div class="w-full max-w-xs">
			<input
				class="btn w-full rounded-3xl normal-case font-semibold text-base text-black border-none"
				type="submit"
				value={$delayed ? 'Loading...' : 'Sign Up'}
				disabled={$delayed}
			/>
		</div>
	</form>
	{#if $message}
		<div>
			<p>{$message}</p>
		</div>
	{/if}
</div>
<!--
<style>
	.textarea {
		@apply flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-small-regular ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800;
	}
</style>
-->