<script lang="ts">
	export let className: string;
	export let control: string;

	const baseClasses =
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
	let computedClasses = `${baseClasses} ${className}`;
</script>

<label class={computedClasses} for={control}>
	<slot />
</label>
