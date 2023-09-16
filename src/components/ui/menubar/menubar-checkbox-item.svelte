<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { Check } from 'lucide-svelte';

	export let className: string = '';
	export let checked: boolean = false;
	export let checkbox;

	const baseClasses =
		'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$checkbox} class={computedClasses}>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		{#if checked}
			<Check className="h-4 w-4" />
		{/if}
	</span>
	<slot />
</div>
