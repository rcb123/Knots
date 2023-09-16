<script lang="ts">
	import CommunityCard from '$components/cards/CommunityCard.svelte';
	import Pagination from '$components/shared/Pagination.svelte';
	import Searchbar from '$components/shared/Searchbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: communities = data.communities;
	$: isNext = data.isNext;
	$: pageNumber = data.pageNumber;
</script>

<h1 class="text-heading2-bold text-light-1">Communities</h1>

<div class="mt-5">
	<Searchbar routeType="communities" />
</div>

<section class="mt-9 flex flex-wrap gap-4">
	{#if communities.length === 0}
		<p class="text-center !text-base-regular text-light-3">No Results</p>
	{:else}
		{#each communities as community (community.id)}
			<CommunityCard
				id={community.id}
				name={community.name}
				username={community.username}
				imgUrl={community.image ||
					'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='}
				bio={community.bio || 'Default biography'}
				members={[]}
			/>
		{/each}
	{/if}
</section>

<Pagination path="communities" {pageNumber} {isNext} />
