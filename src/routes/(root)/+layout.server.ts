import type { LayoutServerLoad } from './$types';

import { fetchCommunities } from '$root/lib/actions/community.actions';
import { fetchUsers } from '$root/lib/actions/user.actions';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ parent, url, locals: { supabase } }) => {
	const { session } = await parent();
	if (!session) {
		throw redirect(302, '/login');
	}
	const pathname = url.pathname;

	const similarMinds = await fetchUsers(supabase, {
		userId: session.user.id,
		pageSize: 4
	});

	const suggestedCommunities = await fetchCommunities(supabase, { pageSize: 4 });

	return { session, pathname, similarMinds, suggestedCommunities };
};
