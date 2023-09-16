<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/ui/button.svelte';

	export let pageNumber: number;
	export let isNext: boolean;
	export let path: string;

	const handleNavigation = (type: string) => {
		let nextPageNumber = pageNumber;

		if (type === 'prev') {
			nextPageNumber = Math.max(1, pageNumber - 1);
		} else if (type === 'next') {
			nextPageNumber = pageNumber + 1;
		}

		if (nextPageNumber > 1) {
			goto(`/${path}?page=${nextPageNumber}`);
		} else {
			goto(`/${path}`);
		}
	};
</script>

{#if isNext && pageNumber !== 1}
	<div class="mt-10 flex w-full items-center justify-center gap-5">
		<Button
			on:click={() => handleNavigation('prev')}
			disabled={pageNumber === 1}
			class="!text-small-regular text-light-2"
		>
			Prev
		</Button>
		<p class="text-small-semibold text-light-1">{pageNumber}</p>
		<Button
			on:click={() => handleNavigation('next')}
			disabled={!isNext}
			class="!text-small-regular text-light-2"
		>
			Next
		</Button>
	</div>
{/if}
