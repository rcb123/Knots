<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let className: string = '';
	export let content;
	export let value: string;

	const baseClasses =
		'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$content(value)} class={computedClasses}>
	<slot />
</div>
