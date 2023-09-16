<script lang="ts">
	export let className: string = '';
	export let inset: boolean = false;
	export let control: string;

	const baseClasses = 'px-2 py-1.5 text-sm font-semibold';
	const computedClasses = `${baseClasses} ${className} ${inset && 'pl-8'}`;
</script>

<label for={control} class={computedClasses}>
	<slot />
</label>
