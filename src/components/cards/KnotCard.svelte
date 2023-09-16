<script lang="ts">
	import type { Community } from '$root/lib/models/community.model';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Knot } from '$root/lib/models/knot.model';
	import type { User } from '$lib/models/user.model';

	import { onMount } from 'svelte';

	import DeleteKnot from '$components/forms/DeleteKnot.svelte';

	export let supabase: SupabaseClient;
	export let currentUserId: string;
	export let knotId: string;
	export let isComment: boolean = false;
	export let pathname: string;

	let author: User;
	let knot: Knot;
	let comments: any[] = [];
	let community: Community;

	onMount(async () => {
		// TODO: Add server-side data fetching using an API endpoint
		// Fetch all the knot data based on the passed in knotId
		try {
			const { data: knotData, error } = await supabase
				.from('knots')
				.select()
				.eq('id', knotId)
				.single();

			if (error) throw error;

			knot = knotData;
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error fetching knot with id ', knotId, ': ', error);
			}
		}

		// Fetch the author data
		try {
			const { data: authorData, error } = await supabase
				.from('users')
				.select('*')
				.eq('id', knot.author)
				.single();

			if (error) throw error;

			author = authorData;
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error fetching author with id ', knot.author, ': ', error);
			}
		}

		// Fetch children/comments data along with their authors, if it exists
		try {
			const { data: commentsData, error } = await supabase
				.from('knots')
				.select('*, author:users(id,profile_image)') // Joining with the users table to get author details
				.eq('parentId', knot.id);

			if (error) throw error;

			comments = commentsData;
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error fetching comments:', error);
			}
		}

		// Fetch community data, if the knot is associated with a community
		if (knot.community) {
			try {
				const { data: communityData, error } = await supabase
					.from('communities')
					.select('*')
					.eq('id', knot.community)
					.single();

				if (error) throw error;

				community = communityData;
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error fetching community with id ', knot.community, ': ', error);
				}
			}
		}
	});
</script>

<article class={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
	<div class="flex items-start justify-between">
		<div class="flex w-full flex-1 flex-row gap-4">
			<div class="flex flex-col items-center">
				<a href={`/profile/${knot.author}`} class="relative h-11 w-11">
					<img
						src={author?.profile_image}
						alt="user_community_image"
						class="cursor-pointer rounded-full"
					/>
				</a>

				<div class="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
			</div>

			<div class="flex w-full flex-col">
				<a href={`/profile/${knot.author}`} class="w-fit">
					<h4 class="cursor-pointer text-base-semibold text-light-1">
						{author?.name}
					</h4>
				</a>

				<p class="mt-2 text-small-regular text-light-2">{knot.text}</p>

				<div class={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
					<div class="flex gap-3.5">
						<img
							src="/assets/heart-gray.svg"
							alt="heart"
							width={24}
							height={24}
							class="cursor-pointer object-contain"
						/>
						<a href={`/knot/${knot.id}`}>
							<img
								src="/assets/reply.svg"
								alt="heart"
								width={24}
								height={24}
								class="cursor-pointer object-contain"
							/>
						</a>
						<img
							src="/assets/repost.svg"
							alt="heart"
							width={24}
							height={24}
							class="cursor-pointer object-contain"
						/>
						<img
							src="/assets/share.svg"
							alt="heart"
							width={24}
							height={24}
							class="cursor-pointer object-contain"
						/>
					</div>

					{#if isComment && comments && comments?.length > 0}
						<a href={`/knot/${knot.id}`}>
							<p class="mt-1 text-subtle-medium text-gray-1">
								{comments?.length} repl{comments?.length > 1 ? 'ies' : 'y'}
							</p>
						</a>
					{/if}
				</div>
			</div>
		</div>
		<DeleteKnot
			{supabase}
			knotId={knot.id}
			{currentUserId}
			authorId={knot.author}
			parentId={knot.parentId ?? null}
			{isComment}
			{pathname}
		/>
	</div>

	{#if !isComment && comments && comments?.length > 0}
		<div class="ml-1 mt-3 flex items-center gap-2">
			{#each comments.slice(0, 2) as comment, index (index)}
				<img
					src={comment.author?.profile_image}
					alt={`user_${index}`}
					width={24}
					height={24}
					class={`${index !== 0 && '-ml-5'} rounded-full object-cover`}
				/>
			{/each}

			<a href={`/knot/${knot.id}`}>
				<p class="mt-1 text-subtle-medium text-gray-1">
					{comments?.length} repl{comments?.length > 1 ? 'ies' : 'y'}
				</p>
			</a>
		</div>
	{/if}

	{#if !isComment && knot.community}
		<a href={`/communities/${knot.community}`} class="mt-5 flex items-center">
			<p class="text-subtle-medium text-gray-1">
				{knot.created_at}
				{community && ` - ${community?.name} Community`}
			</p>

			<img
				src={community?.image}
				alt={community?.name}
				width={14}
				height={14}
				class="ml-1 rounded-full object-cover"
			/>
		</a>
	{/if}
</article>
