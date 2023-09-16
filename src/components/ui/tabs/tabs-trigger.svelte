<script lang="ts">
	import { melt } from "@melt-ui/svelte";

	export let className: string = '';
	export let id: string;
	export let trigger;

	const baseClasses =
		'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div use:melt={$trigger(id)} class={computedClasses}>
	<slot />
</div>
