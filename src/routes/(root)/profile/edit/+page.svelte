<script lang="ts">
	import type { PageData } from './$types';

	import { UserValidation as schema } from '$root/lib/validations/user';
	import { superForm } from 'sveltekit-superforms/client';

	import Button from '$components/ui/button.svelte';

	export let data: PageData;

	const { user } = data;

	const { form, enhance, errors, constraints, delayed } = superForm(data.form, {
		customValidity: false,
		validators: schema,
		multipleSubmits: 'prevent'
	});

	form.update(
		($form) => {
			$form.image = user?.profile_image ? user.profile_image : '';
			$form.name = user?.name ? user.name : '';
			$form.username = user?.username ? user.username : '';
			$form.bio = user?.bio ? user.bio : '';
			return $form;
		},
		{ taint: false }
	);

	let btnTitle: string = 'Continue';
</script>

<h1 class="text-heading2-bold text-light-1">Edit Profile</h1>
<p class="mt-3 text-base-regular text-light-2">Make any changes</p>
<section class="mt-12">
	<form class="flex flex-col justify-start gap-10" method="POST" use:enhance>
		<div class="flex items-center gap-4">
			<label
				for="profile_image"
				class="flex h-24 w-24 items-center justify-center rounded-full bg-dark-4"
			>
				{#if $form.image}
					<img
						src={$form.image}
						alt="profile_icon"
						width={96}
						height={96}
						class="rounded-full object-contain"
					/>
				{:else}
					<img
						src="/assets/profile.svg"
						alt="profile_icon"
						width={24}
						height={24}
						class="object-contain"
					/>
				{/if}
			</label>
			<div class="flex-1 text-base-semibold text-gray-200">
				<input
					type="file"
					id="profile_image"
					name="profile_image"
					accept="image/*"
					placeholder="Add profile photo"
					class="cursor-pointer border-none bg-transparent outline-none file:text-blue"
					aria-invalid={$errors.image ? 'true' : undefined}
					bind:value={$form.image}
					{...$constraints.image}
				/>
			</div>
		</div>

		<div>
			<div class="flex w-full flex-col gap-3">
				<label for="name" class="text-base-semibold text-light-2"> Name </label>
				<div>
					<input
						type="text"
						class="border border-dark-4 bg-dark-3 text-light-1 no-focus"
						name="name"
						id="name"
						aria-invalid={$errors.name ? 'true' : undefined}
						bind:value={$form.name}
						{...$constraints.name}
					/>
				</div>
			</div>
		</div>

		<div>
			<div class="flex w-full flex-col gap-3">
				<label for="username" class="text-base-semibold text-light-2"> Username </label>
				<div>
					<input
						type="text"
						class="border border-dark-4 bg-dark-3 text-light-1 no-focus"
						name="username"
						id="username"
						aria-invalid={$errors.username ? 'true' : undefined}
						bind:value={$form.username}
						{...$constraints.username}
					/>
				</div>
			</div>
		</div>

		<div>
			<div class="flex w-full flex-col gap-3">
				<label for="bio" class="text-base-semibold text-light-2"> Bio </label>
				<div>
					<textarea
						rows="10"
						class="flex min-h-[80px] w-full rounded-md bg-transparent px-3 py-2 text-small-regular ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800 border border-dark-4 bg-dark-3 text-light-1 no-focus"
						name="bio"
						id="bio"
						aria-invalid={$errors.bio ? 'true' : undefined}
						bind:value={$form.bio}
						{...$constraints.bio}
					/>
				</div>
			</div>
		</div>
		<Button type="submit" class="bg-primary-500" disabled={$delayed}>
			{$delayed ? 'Loading...' : btnTitle}
		</Button>
	</form>
</section>

<!--
<style>
	.textarea {
		@apply flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-small-regular ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800;
	}

	.account-form_image-label {
		@apply flex h-24 w-24 items-center justify-center rounded-full bg-dark-4 !important;
	}

	.account-form_image-input {
		@apply cursor-pointer border-none bg-transparent outline-none file:text-blue !important;
	}

	.account-form_input {
		@apply border border-dark-4 bg-dark-3 text-light-1 !important;
	}
</style>
-->
