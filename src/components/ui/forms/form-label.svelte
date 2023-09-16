<script lang="ts">
	import Label from '$components/ui/label.svelte';

	export let className: string = '';
	export let control: string = '';
	export let error: boolean = false;

	let computedClass: string = `${error && 'text-red-500 dark:text-red-900'} ${className}`;
</script>

<Label className={computedClass} {control}>
	<slot />
</Label>
