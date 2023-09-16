<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let className: string = '';
	export let menubar;

	const baseClasses =
		'flex h-10 items-center space-x-1 rounded-md border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$menubar} class={computedClasses}>
	<slot />
</div>
