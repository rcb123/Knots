import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$root/db/supabase.types';

import { invalidate } from '$app/navigation';

export async function fetchKnots(
	supabase: SupabaseClient<Database, 'public'>,
	pageNumber = 1,
	pageSize = 20
) {
	try {
		// Calculate the starting index based on the page number and page size.
		const startIndex = (pageNumber - 1) * pageSize;

		const {
			data: knots,
			error,
			count
		} = await supabase
			.from('knots')
			.select('*', { count: 'exact' })
			.or('parentId.is.null')
			.order('created_at', { ascending: false })
			.range(startIndex, startIndex + pageSize - 1);

		if (error) {
			throw error;
		}

		if (count === null) {
			throw new Error('Total knot count is null');
		}

		const isNext = count > startIndex + (knots?.length || 0);

		return { knots, isNext };
	} catch (error) {
		console.error('Error fetching knots:', error);
		throw new Error('Failed to fetch knots. Please try again later.');
	}
}

export async function createKnot(
	supabase: SupabaseClient<Database, 'public'>,
	text: string,
	author: string,
	communityId: string | null = null
) {
	try {
		const insertData: { text: string; author: string; community?: string | null } = {
			text,
			author
		};

		// Only include communityId in the insert data if it's not null
		if (communityId !== null) {
			insertData.community = communityId;
		}

		const { data: createdknot, error } = await supabase.from('knots').insert([insertData]).single();

		if (error) throw error;

		return createdknot;
	} catch (error) {
		console.error('Error creating knot:', error);
		throw error;
	}
}

export async function fetchAllChildKnotIds(
	supabase: SupabaseClient<Database, 'public'>,
	parentId: string,
	knotIds: string[] = []
): Promise<string[]> {
	try {
		// Fetch child knot IDs for the given parent ID
		const { data: childknots, error } = await supabase
			.from('knots')
			.select('id')
			.eq('parentId', parentId);

		if (error) throw error;

		if (childknots) {
			// Add child knot IDs to the result array
			knotIds.push(...childknots.map((knot) => knot.id));

			// Recursively fetch child knot IDs for each child knot
			for (const childknot of childknots) {
				await fetchAllChildKnotIds(supabase, childknot.id, knotIds);
			}
		}

		return knotIds;
	} catch (error) {
		console.error('Error fetching child knot IDs:', error);
		throw error;
	}
}

export async function deleteKnot(
	supabase: SupabaseClient<Database, 'public'>,
	id: string,
	path: string
): Promise<void> {
	try {
		// Fetch all knot IDs, including descendants, to be deleted
		const knotIdsToDelete = await fetchAllChildKnotIds(supabase, id);

		// Add the original knot ID to the list
		knotIdsToDelete.push(id);

		// Delete all knots in a single batch operation
		const { error: deleteError } = await supabase.from('knots').delete().in('id', knotIdsToDelete);

		if (deleteError) throw new Error(`Failed to delete knot: ${deleteError.message}`);

		// Invalidate cache or take any necessary actions (e.g., notifying users)
		invalidate(path);
	} catch (error) {
		console.error('Error deleting knot:', error);
		throw error;
	}
}

export async function fetchKnotById(supabase: SupabaseClient<Database, 'public'>, knotId: string) {
	const { data: knot, error } = await supabase.from('knots').select().eq('id', knotId).single();

	if (error) throw new Error('Unable to fetch knot');

	return knot;
}

export async function addCommentToKnot(
	supabase: SupabaseClient<Database, 'public'>,
	knotId: string,
	commentText: string,
	userId: string,
	path: string
) {
	try {
		// Insert the comment with parentId set to the knotId
		const { data: commentKnot, error: createError } = await supabase
			.from('knots')
			.insert([{ text: commentText, author: userId, parentId: knotId }])
			.single();

		if (createError || !commentKnot) throw new Error('Unable to add comment');

		// Invalidate cache or take any necessary actions (e.g., notifying users)
		invalidate(path);

		return commentKnot;
	} catch (error) {
		console.error('Error adding comment to knot:', error);
		throw error;
	}
}
