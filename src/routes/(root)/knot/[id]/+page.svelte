<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	import KnotCard from '$components/cards/KnotCard.svelte';

	export let data: PageData;

	const {
		supabase,
		knot,
		commentIds,
		pathname,
		session: { user }
	} = data;

	let userImg = ''; // TODO: Setup user image uploads and figure out query for src

	const { form } = superForm(data.form, {
		// Reset form upon a successful result
		resetForm: true
	});
</script>

<section class="relative">
	<div>
		<!-- TODO: since there is no nesting, use a join table to query the entire knot -->
		<knotCard {supabase} currentUserId={user.id} knotId={knot.id} {pathname} />
	</div>

	<div class="mt-7">
		<form
			method="POST"
			class="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col"
		>
			<div class="flex w-full items-center gap-3">
				<label for="knot">
					<img
						src={userImg}
						alt="current_user"
						width={48}
						height={48}
						class="rounded-full object-cover"
					/>
				</label>
				<div class="border-none bg-transparent">
					<input
						type="text"
						placeholder="Comment..."
						class="no-focus text-light-1 outline-none"
						name="knot"
						id="knot"
						bind:value={$form.knot}
					/>
				</div>
			</div>
			<button
				type="submit"
				class="rounded-3xl bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full"
				>Reply</button
			>
		</form>
	</div>
	{#if commentIds}
		<div class="mt-10">
			{#each commentIds as commentId}
				<KnotCard {supabase} currentUserId={user.id} knotId={commentId} isComment {pathname} />
			{/each}
		</div>
	{/if}
</section>

<!--
<style>
	.comment-form {
		@apply mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col !important;
	}

	.comment-form_btn {
		@apply rounded-3xl bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full !important;
	}
</style>
-->
