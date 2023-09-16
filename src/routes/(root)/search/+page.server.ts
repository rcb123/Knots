import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fetchUsers } from '$root/lib/actions/user.actions';

export const load: PageServerLoad = async ({ parent, url, locals: { supabase } }) => {
	const { session } = await parent();
	if (!session) {
		redirect(302, '/');
		return;
	}

	const searchString = url.searchParams.get('q') || '';
	const pageString = url.searchParams.get('page');
	const pageNumber = pageString ? +pageString : 1;

	const { users, isNext } = await fetchUsers(supabase, {
		userId: session.user.id,
		searchString,
		pageNumber,
		pageSize: 25
	});

	return { users, isNext, pageNumber };
};
