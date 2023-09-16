<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '$db/supabase.types';

	import { deleteKnot } from '$lib/actions/knot.actions';
	import { goto } from '$app/navigation';

	export let supabase: SupabaseClient<Database, 'public'>;
	export let knotId: string;
	export let currentUserId: string;
	export let authorId: string;
	export let parentId: string | null;
	export let isComment: boolean = false;
	export let pathname: string;
</script>

{#if currentUserId === authorId && pathname !== '/'}
	<!-- TODO: Fix accessibility issues -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<img
		src="/assets/delete.svg"
		alt="delete"
		width={18}
		height={18}
		class="cursor-pointer object-contain"
		on:click={async () => {
			await deleteKnot(supabase, knotId, pathname);
			if (!parentId || !isComment) {
				goto('/');
			}
		}}
	/>
{/if}
