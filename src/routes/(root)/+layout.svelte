<script lang="ts">
	import type { LayoutData } from './$types';

	import { sidebarLinks } from '$constants/index';
	import { goto } from '$app/navigation';

	import RightSidebar from '$root/components/shared/RightSidebar.svelte';
	import LeftSidebar from '$root/components/shared/LeftSidebar.svelte';
	import Bottombar from '$components/shared/Bottombar.svelte';
	import Topbar from '$root/components/shared/Topbar.svelte';

	export let data: LayoutData;

	const { supabase, session, similarMinds, suggestedCommunities } = data;

	$: ({ pathname } = data);

	let loading = false;

	async function signOut() {
		loading = true;
		let { error } = await supabase.auth.signOut();
		if (error) {
			alert(error.message);
		}
		loading = false;
		goto('/login');
	}
</script>

<Topbar {session} {signOut} {loading} />
<main class="flex flex-row">
	<LeftSidebar {session} {sidebarLinks} {signOut} {pathname} {loading} />
	<section
		class="flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10"
	>
		<div class="w-full max-w-4xl"><slot /></div>
	</section>
	<RightSidebar {similarMinds} {suggestedCommunities} />
</main>
<Bottombar {pathname} />
