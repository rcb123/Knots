<script lang="ts">
	export let className: string = '';

	const baseClasses = '';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<div class={computedClasses}>
	<slot />
</div>
