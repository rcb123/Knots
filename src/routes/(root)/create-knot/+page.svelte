<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	import Button from '$components/ui/button.svelte';
	import Textarea from '$root/components/ui/textarea.svelte';

	export let data: PageData;
	const { form } = superForm(data.form);
</script>

<h1 class="text-heading2-bold text-light-1">Create Knot</h1>

<form method="POST" class="mt-10 flex flex-col justify-start gap-10">
	<div class="flex w-full flex-col gap-3">
		<label for="knot" class="text-base-semibold text-light-2"> Content </label>
		<div class="no-focus bg-dark-3 text-light-1">
			<Textarea rows={15} class="w-full m-0 p-0" name="knot" bind:value={$form.knot} />
		</div>
	</div>
	<Button type="submit" class="bg-primary-500">Post Knot</Button>
</form>
