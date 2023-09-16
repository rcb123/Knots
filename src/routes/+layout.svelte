<script lang="ts">
	import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
	import type { LayoutData } from './$types';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import '$root/app.css';

	export let data: LayoutData;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(
			(event: AuthChangeEvent, _session: Session | null) => {
				if (_session?.expires_at !== session?.expires_at) {
					invalidate('supabase:auth');
				}
			}
		);

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Knots</title>
	<meta name="description" content="A SvelteKit Threads Clone" />
</svelte:head>

<slot />
