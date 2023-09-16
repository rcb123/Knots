<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let className: string = '';
	export let root;

	const baseClasses = '';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$root} class={computedClasses}>
	<slot />
</div>
