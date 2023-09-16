<script lang="ts">
	import KnotCardFull from '$components/cards/KnotCardFull.svelte';
	import Pagination from '$components/shared/Pagination.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { supabase, session, pageNumber, knots, isNext, pathname } = data;
</script>

<h1 class="text-heading2-bold text-light-1">Home</h1>

{#if knots}
	<section class="mt-9 flex flex-col gap-10">
		{#if knots.length === 0}
			<p class="text-center !text-base-regular text-light-3">No Knots found</p>
		{:else}
			{#each knots as knot (knot.id)}
				<KnotCardFull {supabase} currentUserId={session.user.id} {knot} {pathname} />
			{/each}
		{/if}
	</section>

	<Pagination path="/" {pageNumber} {isNext} />
{/if}
