<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let className: string = '';
	export let radioGroup;

	const baseClasses = '';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$radioGroup} class={computedClasses} />
