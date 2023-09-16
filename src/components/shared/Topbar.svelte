<script lang="ts">
	import type { Session } from '@supabase/supabase-js';

	export let session: Session;
	export let signOut: () => Promise<void>;
	export let loading: boolean;
</script>

<nav class="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
	<a href="/" class="flex items-center gap-4">
		<!-- <img src="https://fav.farm/🧵" alt="logo" width={28} height={28} /> -->
		<p class="text-heading3-bold text-light-1 max-xs:hidden">Knots</p>
	</a>

	<div class="flex items-center gap-1">
		<div class="block md:hidden">
			{#if session}
				<button class="btn btn-primary flex cursor-pointer" on:click={signOut} disabled={loading}>
					<img src="/assets/logout.svg" alt="logout" width={24} height={24} />
				</button>
			{/if}
		</div>

		<!-- TODO: Add a widget to allow users to switch accounts -->
	</div>
</nav>
