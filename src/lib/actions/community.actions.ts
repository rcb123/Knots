import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$db/supabase.types';
import type { Knot } from '$lib/models/knot.model';

type SortOrder = 'asc' | 'desc';

export async function createCommunity(
	supabase: SupabaseClient<Database, 'public'>,
	name: string,
	username: string,
	bio: string,
	createdById: string,
	image?: string
) {
	// Create a community based on the passed in information
	try {
		const { data, error } = await supabase
			.from('communities')
			.insert({
				name,
				username,
				bio,
				created_by: createdById,
				image
			})
			.single();

		if (error) {
			throw error;
		}

		return data;
	} catch (error) {
		console.error('Error creating community:', error);
		throw error;
	}
}

// Fetches the details of a community
export async function fetchCommunityDetails(
	supabase: SupabaseClient<Database, 'public'>,
	id: string
) {
	try {
		const { data: community, error } = await supabase
			.from('communities')
			.select('*')
			.eq('id', id)
			.single();

		if (error) {
			throw error;
		}

		return { community };
	} catch (error) {
		console.error('Error fetching community details:', error);
		throw error;
	}
}

export async function fetchCommunityKnots(
	supabase: SupabaseClient<Database, 'public'>,
	id: string
): Promise<{ knots: Knot[] }> {
	try {
		// Fetch all knots from a specific community
		const { data: knots, error } = await supabase.from('knots').select('*').eq('community', id);
		
		if (error) {
			throw error;
		}

		return { knots };
	} catch (error) {
		console.error('Error fetching community knots:', error);
		throw error;
	}
}

export async function fetchCommunities(
	supabase: SupabaseClient<Database, 'public'>,
	{
		searchString = '',
		pageNumber = 1,
		pageSize = 20,
		sortBy = 'desc'
	}: {
		searchString?: string;
		pageNumber?: number;
		pageSize?: number;
		sortBy?: SortOrder;
	}
) {
	// Fetch all communities
	try {
		// Calculate the number of records to skip based on the page number and page size
		const skipAmount = (pageNumber - 1) * pageSize;
		// Create a query to fetch all communities from the database and count the total number of communities
		let query = supabase.from('communities').select('*', { count: 'estimated' });

		if (searchString.trim() !== '') {
			// If a search string is provided, filter the results by the search string
			query = query.or(`username.ilike.${searchString},name.ilike.${searchString}`);
		}

		// Order the results by created_at, descending by default
		query = query
			.order('created_at', { ascending: sortBy === 'asc' })
			.range(skipAmount, skipAmount + pageSize - 1);

		const { data: suggestedCommunities, error, count } = await query;

		if (error) console.error('Error fetching communities: ', error);
		if (!count) {
			// This should never trigger, count should be 0 in cases where there are 0 communities
			console.error('Count is undefined! ', count);
			throw error;
		}

		// Calculate whether there are more communities to fetch
		const isNext = count > pageNumber * pageSize;

		if (suggestedCommunities === null) {
			console.error('No communities found');
		}

		return { suggestedCommunities, isNext };
	} catch (error) {
		console.error('Error fetching communities: ', error);
		throw error;
	}
}

export async function addUserToCommunity(
	supabase: SupabaseClient<Database, 'public'>,
	userId: string,
	communityId: string
) {
	try {
		// Check if the user has a membership record for the community
		const { data: existingMembership, error: membershipError } = await supabase
			.from('community_membership')
			.select('id')
			.eq('user_id', userId)
			.eq('community_id', communityId)
			.single();

		if (membershipError) throw membershipError;

		if (!existingMembership) {
			// User is not a member, so insert a new record in the community_membership table
			await supabase.from('community_membership').insert([
				{
					user_id: userId,
					community_id: communityId,
					join_date: new Date().toISOString()
				}
			]);
		}
	} catch (error) {
		console.error('Error adding user to community:', error);
		throw error;
	}
}

export async function removeUserFromCommunity(
	supabase: SupabaseClient<Database, 'public'>,
	userId: string,
	communityId: string
) {
	// Check if the user has a membership record for the community
	const { data: existingMembership, error: membershipError } = await supabase
		.from('community_membership')
		.select('user_id, community_id')
		.eq('user_id', userId)
		.eq('community_id', communityId)
		.single();

	if (membershipError) throw membershipError;

	if (existingMembership) {
		// Delete the user's membership record in the community_membership table
		await supabase
			.from('community_membership')
			.delete()
			.eq('user_id', existingMembership.user_id)
			.eq('community_id', existingMembership.community_id);
	} else {
		// Log a message indicating that the user is not a member of the community
		console.log(`User ${userId} is not a member of community ${communityId}`);
	}
}

export async function updateCommunityInfo(
	supabase: SupabaseClient<Database, 'public'>,
	communityId: string,
	name: string,
	username: string,
	image: string
) {
	try {
		const { data, error } = await supabase
			.from('communities')
			.update({
				name,
				username,
				image
			})
			.eq('id', communityId);

		if (error) throw error;

		if (!data) throw new Error('Community not found');

		return data[0];
	} catch (error) {
		console.error('Error updating community information:', error);
		throw error;
	}
}

// Database is setup to cascade on delete, so deleting a community will delete all related entries in the join table
export async function deleteCommunity(
	supabase: SupabaseClient<Database, 'public'>,
	communityId: string
) {
	// Delete the community from the communities table
	const { error: deleteError } = await supabase.from('communities').delete().eq('id', communityId);

	if (deleteError) throw deleteError;
}