<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import { melt } from '@melt-ui/svelte';

	export let inset: boolean = false;
	export let className: string = '';
	export let subTrigger;

	const baseClasses =
		'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-50';
	const computedClasses = `${baseClasses} ${className} ${inset && 'pl-8'}`;
</script>

<div use:melt={$subTrigger} class={computedClasses}>
	<slot />
	<ChevronRight className="ml-auto h-4 w-4" />
</div>
