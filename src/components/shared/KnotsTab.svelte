<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Knot } from '$lib/models/knot.model';

	import KnotCardFull from '$components/cards/KnotCardFull.svelte';

	export let supabase: SupabaseClient;
	export let currentUserId: string;
	export let knots: Knot[];
	export let pathname: string;
</script>

<section class="mt-9 flex flex-col gap-10">
	{#each knots as knot (knot.id)}
		<KnotCardFull {supabase} {currentUserId} {knot} {pathname} />
	{/each}
</section>
