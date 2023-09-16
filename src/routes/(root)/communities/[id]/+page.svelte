<script lang="ts">
	import type { PageData } from './$types';

	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs/index';
	import ProfileHeader from '$components/shared/ProfileHeader.svelte';
	import KnotsTab from '$components/shared/KnotsTab.svelte';
	import UserCard from '$components/cards/UserCard.svelte';
	import { communityTabs } from '$constants/index';
	import { createTabs } from '@melt-ui/svelte';

	export let data: PageData;

	const {
		supabase,
		session: { user },
		communityDetails: community,
		communityKnots,
		pathname
	} = data;
	const communityDetails = community as unknown as CommunityDetails;

	const {
		elements: { root, list, content, trigger }
	} = createTabs({
		defaultValue: 'knots'
	});

	type CommunityDetails = {
		id: string; // Required field, Primary Key
		username: string; // Required field, Unique field
		name: string; // Required field
		image: string | null;
		bio: string | null;
		created_at: string;
		created_by: string; // Foreign Key referencing User
		knots: string[] | null; // Foreign Key referencing knot
		members: {
			id: string; // Required field, Primary Key
			username: string; // Required field, Unique field
			name: string; // Required field
			profile_image: string | null;
			bio: string | null;
			knots: string[] | null; // Foreign Key referencing knot
			communities: string[] | null; // Foreign Key referencing Community
			created_at: string;
			updated_at: string;
		}[] | null; // Foreign Key referencing User
	};
</script>

<section>
	<ProfileHeader
		accountId={communityDetails.created_by}
		authUserId={user.id}
		name={communityDetails.name}
		username={communityDetails.username}
		imgUrl={communityDetails.image ? communityDetails.image : ''}
		bio={communityDetails.bio ? communityDetails.bio : ''}
		type="Community"
	/>

	<div class="mt-9">
		<Tabs {root} className="w-full">
			<TabsList {list} className="tab">
				{#each communityTabs as tab (tab.value)}
					<TabsTrigger {trigger} id={tab.value} className="tab">
						<img src={tab.icon} alt={tab.label} width={24} height={24} class="object-contain" />
						<p class="max-sm:hidden">{tab.label}</p>

						{#if tab.label === 'knots' && communityDetails.knots}
							<p class="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
								{communityDetails.knots.length}
							</p>
						{/if}
					</TabsTrigger>
				{/each}
			</TabsList>

			<TabsContent {content} value="knots" className="w-full text-light-1">
				<KnotsTab {supabase} knots={communityKnots} currentUserId={user.id} {pathname} />
			</TabsContent>

			{#if communityDetails.members}
				<TabsContent {content} value="members" className="mt-9 w-full text-light-1">
					<section class="mt-9 flex flex-col gap-10">
						{#each communityDetails.members as member (member.id)}
							<UserCard
								id={member.id}
								name={member.name}
								username={member.username}
								imgUrl={member.profile_image ? member.profile_image : ''}
								personType="User"
							/>
						{/each}
					</section>
				</TabsContent>
			{/if}

			<TabsContent {content} value="requests" className="w-full text-light-1">
				<KnotsTab {supabase} currentUserId={user.id} knots={communityKnots} {pathname} />
			</TabsContent>
		</Tabs>
	</div>
</section>
