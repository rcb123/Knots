<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let className: string = '';
	export let label: string = '';
	export let list;

	const baseClasses =
		'inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$list} class={computedClasses} aria-label={label}>
	<slot />
</div>
