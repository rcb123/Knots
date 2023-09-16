<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { activities } = data;
</script>

<h1 class="text-heading2-bold text-light-1">Activity</h1>

<section class="mt-10 flex flex-col gap-5">
	{#if !activities || activities.length === 0}
		<p class="text-center !text-base-regular text-light-3">No activity yet</p>
	{:else}
		{#each activities as activity (activity.id)}
			<a href={`/knot/${activity.parentId}`}>
				<article class="flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4">
					{#if activity.author}
						<img
							src={activity.author.profile_image ||
								'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='}
							alt="user_logo"
							width={20}
							height={20}
							class="rounded-full object-cover"
						/>
						<p class="!text-small-regular text-light-1">
							<span class="mr-1 text-primary-500">
								{activity.author.name}
							</span>{' '}
							replied to your knot
						</p>
					{:else}
						Unknown author replied to your knot
					{/if}
				</article>
			</a>
		{/each}
	{/if}
</section>
