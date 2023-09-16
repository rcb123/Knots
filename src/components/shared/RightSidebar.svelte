<script lang="ts">
	import UserCard from '$components/cards/UserCard.svelte';

	export let suggestedCommunities: {
		suggestedCommunities: any[];
		isNext: boolean;
	};
	export let similarMinds: {
		users: any[];
		isNext: boolean;
	};
</script>

<section
	class="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden"
>
	<div class="flex flex-1 flex-col justify-start">
		<h3 class="text-heading4-medium text-light-1">Suggested Communities</h3>

		<div class="mt-7 flex w-[350px] flex-col gap-9">
			{#if suggestedCommunities?.suggestedCommunities?.length > 0}
				{#each suggestedCommunities?.suggestedCommunities as community (community.id)}
					<UserCard
						id={community.id}
						name={community.name}
						username={community.username}
						imgUrl={community.image}
						personType="Community"
					/>
				{/each}
			{:else}
				<p class="!text-base-regular text-light-3">No communities yet</p>
			{/if}
		</div>
	</div>

	<div class="flex flex-1 flex-col justify-start">
		<h3 class="text-heading4-medium text-light-1">Similar Minds</h3>
		<div class="mt-7 flex w-[350px] flex-col gap-10">
			{#if similarMinds?.users?.length > 0}
				{#each similarMinds?.users as person (person.id)}
					<UserCard
						id={person.id}
						name={person.name}
						username={person.username}
						imgUrl={person.profile_image}
						personType="User"
					/>
				{/each}
			{:else}
				<p class="!text-base-regular text-light-3">No users yet</p>
			{/if}
		</div>
	</div>
</section>
