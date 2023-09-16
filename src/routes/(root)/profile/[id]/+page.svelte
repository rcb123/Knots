<script lang="ts">
	import type { PageData } from './$types';

	import { profileTabs } from '$root/constants';
	import { melt, createTabs } from '@melt-ui/svelte';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	import KnotsTab from '$components/shared/KnotsTab.svelte';
	import ProfileHeader from '$components/shared/ProfileHeader.svelte';

	export let data: PageData;

	// These reactivity statements are necessary to force updating of load function data
	// Without it, profile page data won't update when navigating between profile pages
	$: supabase = data.supabase
	$: user = data.user;
	$: account = data.account;
	$: userKnots = data.userKnots;
	$: pathname = data.pathname;


	onMount(async () => {
		if (!userKnots) {
			redirect(307, '/');
		}
	});

	const {
		elements: { root, list, content, trigger }
	} = createTabs({ defaultValue: profileTabs[0].value });
</script>

<section>
	<ProfileHeader
		accountId={account.id}
		authUserId={user.id}
		name={account.name}
		username={account.username}
		imgUrl={account.profile_image ? account.profile_image : ''}
		bio={account.bio ? account.bio : ''}
	/>

	<div class="mt-9">
		<div use:melt={$root} class="flex w-full flex-col overflow-hidden rounded-xl shadow-lg">
			<div use:melt={$list} class="tab flex shrink-0 overflow-x-auto">
				{#each profileTabs as tab}
					<button use:melt={$trigger(tab.value)} class="tab justify-center">
						<img src={tab.icon} alt={tab.label} width={24} height={24} class="object-contain" />
						<p class="max-sm:hidden">{tab.label}</p>
						{#if tab.label === 'Knots'}
							<p class="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
								{userKnots?.length ? userKnots.length : 0}
							</p>
						{/if}
					</button>
				{/each}
			</div>
			{#each profileTabs as tab}
				<div use:melt={$content(tab.value)} class="w-full text-light-1">
					<KnotsTab {supabase} currentUserId={user.id} knots={userKnots} {pathname} />
				</div>
			{/each}
		</div>
	</div>
</section>
