<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onDestroy } from 'svelte';

	export let routeType: string;

	let search: string;
	let timeout: NodeJS.Timeout;

	$: console.log(base)

	// query after 0.3s of no input
	const debounceSearch = () => {
		clearTimeout(timeout); // Clear any existing timeout
		timeout = setTimeout(() => {
			if (search != '') {
				goto(`.${routeType}?q=${search}`, { invalidateAll: true });
			} else {
				goto(`.${routeType}`);
			}
		}, 300);
	};

	onDestroy(() => clearTimeout(timeout));
</script>

<div class="flex gap-1 rounded-lg bg-dark-3 px-4 py-2">
	<img src="/assets/search-gray.svg" alt="search" width={24} height={24} class="object-contain" />
	<input
		id="text"
		bind:value={search}
		on:input={debounceSearch}
		placeholder={`${routeType !== '/search' ? 'Search Communities' : 'Search Users'}`}
		class="flex h-10 w-full rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800 no-focus border-none bg-dark-3 text-base-regular text-light-4 outline-none"
	/>
</div>
