<script lang="ts">
	export let accountId: string;
	export let authUserId: string;
	export let name: string;
	export let username: string;
	export let imgUrl: string;
	export let bio: string;
	export let type: string = '';
</script>

<div class="flex w-full flex-col justify-start">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="relative h-20 w-20 object-cover">
				<img src={imgUrl} alt="logo" class="rounded-full object-cover shadow-2xl" />
			</div>

			<div class="flex-1">
				<h2 class="text-left text-heading3-bold text-light-1">
					{name}
				</h2>
				<p class="text-base-medium text-gray-1">@{username}</p>
			</div>
		</div>
		{#if accountId === authUserId && type !== 'Community'}
			<a href="/profile/edit">
				<div class="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
					<img src="/assets/edit.svg" alt="logout" width={16} height={16} />

					<p class="text-light-2 max-sm:hidden">Edit</p>
				</div>
			</a>
		{/if}
	</div>

	<p class="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

	<div class="mt-12 h-0.5 w-full bg-dark-3" />
</div>
