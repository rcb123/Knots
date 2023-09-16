<script lang="ts">
	import type { Session } from '@supabase/supabase-js';

	export let sidebarLinks: { imgURL: string; route: string; label: string }[];
	export let signOut: () => Promise<void>;
	export let pathname: string;
	export let loading: boolean;
	export let session: Session;
</script>

<section
	class="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden"
>
	<div class="flex w-full flex-1 flex-col gap-6 px-6">
		{#each sidebarLinks as link (link.route)}
			<!-- TODO: The implementation of reactivity for this active class is terrible -->
			<!-- If the link should route to the profile page, concatenate the correct id.
				 If the user navigates directly to /profile, a fallback is in place that will redirect to the proper location. -->
			<a
				href={link.route === '/profile' ? `${link.route}/${session.user.id}` : link.route}
				class={`relative flex justify-start gap-4 rounded-lg p-4 ${
					((pathname.includes(link.route) && link.route.length > 1) || pathname === link.route) &&
					'bg-primary-500 '
				}`}
			>
				<img src={link.imgURL} alt={link.label} width={24} height={24} />

				<p class="text-light-1 max-lg:hidden">{link.label}</p>
			</a>
		{/each}
	</div>

	<div class="mt-10 px-6">
		<!-- This ensures that a signout button will only appear if the user is currently signed in.
                 This component is only used in authenticated routes, so the button should always appear. -->
		{#if session}
			<button
				class="btn btn-primary flex normal-case font-normal cursor-pointer gap-4 p-4"
				on:click={signOut}
				disabled={loading}
			>
				<img src="/assets/logout.svg" alt="logout" width={24} height={24} />
				<p class="text-light-2 max-lg:hidden">Logout</p>
			</button>
		{/if}
	</div>
</section>
