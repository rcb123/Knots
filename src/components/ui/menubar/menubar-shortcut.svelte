<script lang="ts">
	export let className: string = '';

	const baseClasses = 'ml-auto text-xs tracking-widest text-slate-500 dark:text-slate-400';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<span class={computedClasses}><slot /></span>
