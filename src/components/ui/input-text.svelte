<script lang="ts">
	export let id: string = '';
	export let name: string = '';
	export let autocomplete: string = '';
	let className: string = '';
	export let invalid: boolean = false;
	export let value: string;
	export let constraints: any = null;
	export let placeholder: string = '';

	export { className as class };

	let baseClasses: string =
		'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800';
	let computedClasses: string = `${baseClasses} ${className}`;
</script>

<input
	{id}
	{name}
	type="text"
	{autocomplete}
	class={computedClasses}
	aria-invalid={invalid}
	bind:value
	{placeholder}
	{...constraints}
/>
