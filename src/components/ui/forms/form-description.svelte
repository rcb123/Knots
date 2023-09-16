<script lang="ts">
	export let id: string;
	export let className: string = '';
</script>

<p {id} class={'text-sm text-slate-500 dark:text-slate-400' + className}>
	<slot />
</p>
