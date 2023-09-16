import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$db/supabase.types';

import { invalidate } from '$app/navigation';
import type { User } from '../models/user.model';

interface Params {
	id: string;
	username: string;
	name: string;
	bio: string;
	profile_image: string;
	path: string;
}

export async function updateUser(
	supabase: SupabaseClient<Database, 'public'>,
	{ id, username, name, bio, profile_image, path }: Params
): Promise<void> {
	try {
		const { error } = await supabase
			.from('users')
			.update({ id, username, name, bio, profile_image });

		if (error) {
			throw error;
		}

		if (path === '/profile/edit') {
			throw invalidate(path);
		}
	} catch (error: unknown) {
		const knownError = error as PostgrestError;
		throw new Error(`Failed to create/update user: ${knownError.message}`);
	}
}

export async function fetchUserKnots(supabase: SupabaseClient<Database, 'public'>, userId: string) {
	try {
		const { data: Knots, error } = await supabase
			.from('knots')
			.select(
				`
				id,
				text,
				author,
				created_at,
				parentId,
				community
			`
			)
			.eq('author', userId);

		if (error) {
			throw error;
		}

		return Knots;
	} catch (error) {
		console.error('Error fetching user Knots:', error);
		throw error;
	}
}

export async function fetchUsers(
	supabase: SupabaseClient<Database, 'public'>,
	{
		userId,
		searchString = '',
		pageNumber = 1,
		pageSize = 20,
		sortBy = 'desc'
	}: {
		userId: string;
		pageNumber?: number;
		pageSize?: number;
		searchString?: string;
		sortBy?: string;
	}
): Promise<{ users: User[]; isNext: boolean }> {
	try {
		const baseQuery = supabase
			.from('users')
			.select('*', { count: 'estimated' })
			.neq('id', userId)
			.order('created_at', { ascending: sortBy === 'asc' })
			.range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1);

		if (searchString.trim() !== '') {
			baseQuery.or(`username.ilike.%${searchString}%,name.ilike.%${searchString}%`);
		}

		const { data: users, error, count } = await baseQuery;

		if (error) throw error;
		if (!count) {
			console.error('Count is undefined!');
			throw new Error('Count is undefined!');
		}

		const isNext = count > pageNumber * pageSize;

		return { users, isNext };
	} catch (error) {
		console.error('Error fetching users:', error);
		return { users: [], isNext: false }; // Default return in case of any exceptions.
	}
}

async function fetchAllChildKnotIds(
	supabase: SupabaseClient<Database, 'public'>,
	userId: string,
	knotIds: string[] = []
): Promise<string[]> {
	try {
		// Fetch knot IDs where the user is the author
		const { data: userKnots, error } = await supabase
			.from('knots')
			.select('id')
			.eq('author', userId);

		if (error) {
			throw error;
		}

		// Collect the IDs of user's knots
		const userKnotIds = userKnots.map((knot) => knot.id);

		// Fetch child knot IDs for each user's knot
		for (const userKnotId of userKnotIds) {
			await fetchAllChildKnotIds(supabase, userKnotId, knotIds);
		}

		return knotIds;
	} catch (error) {
		console.error('Error fetching child knot IDs:', error);
		throw error;
	}
}

export async function getActivity(supabase: SupabaseClient<Database, 'public'>, userId: string) {
	try {
		// Fetch all child knot IDs associated with the user's knots
		const childKnotIds = await fetchAllChildKnotIds(supabase, userId);

		if (childKnotIds.length === 0) {
			return null;
		}

		// Fetch the child knots
		const { data: replies, error } = await supabase
			.from('knots')
			.select(
				`author:users (name, profile_image),
                community,
                created_at,
                id,
                parentId,
                text`
			)
			.in('id', childKnotIds)
			.neq('author', userId);

		if (error) {
			throw error;
		}

		return replies;
	} catch (error) {
		console.error('Error fetching replies: ', error);
		throw error;
	}
}
