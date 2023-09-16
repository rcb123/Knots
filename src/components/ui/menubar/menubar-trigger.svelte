<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let className: string = '';
	export let trigger;

	const baseClasses =
		'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-slate-100 focus:text-slate-900 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-50';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$trigger} class={computedClasses}>
	<slot />
</div>
