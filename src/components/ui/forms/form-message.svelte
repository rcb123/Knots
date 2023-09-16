<script lang="ts">
export let id: string
export let className: string = '';
</script>

<p
	{id}
	class={'text-sm font-medium text-red-500 dark:text-red-900'+ className}
>
	<slot />
</p>
