<script lang="ts">
	import Button from '$components/ui/button.svelte';

	export let id: string;
	export let name: string;
	export let username: string;
	export let imgUrl: string;
	export let bio: string;
	export let members: {
		image: string;
	}[];
</script>

<article class="w-full rounded-lg bg-dark-3 px-4 py-5 sm:w-96">
	<div class="flex flex-wrap items-center gap-3">
		<a href={`/communities/${id}`} class="relative h-12 w-12">
			<img src={imgUrl} alt="community_logo" class="rounded-full object-cover" />
		</a>

		<div>
			<a href={`/communities/${id}`}>
				<h4 class="text-base-semibold text-light-1">{name}</h4>
			</a>
			<p class="text-small-medium text-gray-1">@{username}</p>
		</div>
	</div>

	<p class="mt-4 text-subtle-medium text-gray-1">{bio}</p>

	<div class="mt-5 flex flex-wrap items-center justify-between gap-3">
		<a href={`/communities/${id}`}>
			<Button
				size="sm"
				variant="default"
				class="rounded-lg bg-primary-500 px-5 py-1.5 text-small-regular !text-light-1 !important"
				>View</Button
			>
		</a>
		{#if members.length > 0}
			<div class="flex items-center">
				{#each members as member, index (index)}
					<img
						src={member.image}
						alt={`user_${index}`}
						width={28}
						height={28}
						class={`${index !== 0 && '-ml-2'} rounded-full object-cover`}
					/>
				{/each}
				{#if members.length > 3}
					<p class="ml-1 text-subtle-medium text-gray-1">
						{members.length}+ Users
					</p>
				{/if}
			</div>
		{/if}
	</div>
</article>
