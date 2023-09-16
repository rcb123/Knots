<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	
	export let className: string = '';
	export let inset: boolean = false;
	export let item;

	const baseClasses =
		'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50';
	const computedClasses = `${baseClasses} ${className} ${inset && 'pl-8'}`;
</script>

<div use:melt={$item} class={computedClasses}>
	<slot />
</div>
