<script lang="ts">
	import UserCard from '$components/cards/UserCard.svelte';
	import Searchbar from '$components/shared/Searchbar.svelte';
	import Pagination from '$components/shared/Pagination.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: users = data.users;
	$: isNext = data.isNext;
	$: pageNumber = data.pageNumber;
</script>

<section>
	<h1 class="text-heading2-bold text-light-1 mb-10">Search</h1>

	<Searchbar routeType="/search" />
	{#if users}
		<div class="mt-14 flex flex-col gap-9">
			{#if users.length === 0}
				<p class="text-center !text-base-regular text-light-3">No Results</p>
			{:else}
				{#each users as user (user.id)}
					<UserCard
						id={user.id}
						name={user.name}
						username={user.username}
						imgUrl={user.profile_image ? user.profile_image : ''}
						personType="User"
					/>
				{/each}
			{/if}
		</div>
		{#if isNext && pageNumber}
			<Pagination path="search" {pageNumber} {isNext} />
		{/if}
	{/if}
</section>
