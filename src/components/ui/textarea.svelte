<script lang="ts">
	let className: string = '';
	export let name: string = '';
	export let rows: number;
	export let value: string;

	export { className as class };

	const baseClasses =
		'flex min-h-[80px] w-full rounded-md border border-dark-4 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800';
	let computedClasses = `${baseClasses} ${className}`;
</script>

<textarea {rows} class={computedClasses} {name} bind:value />
