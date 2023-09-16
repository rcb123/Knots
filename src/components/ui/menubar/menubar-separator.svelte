<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let className: string = '';
	export let separator;

	const baseClasses = '-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$separator} class={computedClasses}>
	<slot />
</div>
