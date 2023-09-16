<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let className: string = '';
	export let subMenu;

	const baseClasses = '';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$subMenu} class={computedClasses}>
	<slot />
</div>
