<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$components/ui/button.svelte';

	export let id: string;
	export let name: string;
	export let username: string;
	export let imgUrl: string;
	export let personType: string;

	let isCommunity: boolean;

	$: isCommunity = personType === 'Community';
</script>

<article
	class="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center"
>
	<div class="flex flex-1 items-start justify-start gap-3 xs:items-center">
		<div class="relative h-12 w-12">
			<img src={imgUrl} alt="user_logo" class="rounded-full object-cover" />
		</div>

		<div class="flex-1 text-ellipsis">
			<h4 class="text-base-semibold text-light-1">{name}</h4>
			<p class="text-small-medium text-gray-1">@{username}</p>
		</div>
	</div>

	<Button
		class="h-auto min-w-[74px] rounded-lg bg-primary-500 text-[12px] text-light-1 !important"
		action={() => {
			if (isCommunity) {
				goto(`/communities/${id}`);
			} else {
				goto(`/profile/${id}`);
			}
		}}
	>
		View
	</Button>
</article>
