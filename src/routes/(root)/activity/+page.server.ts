import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import { getActivity } from '$root/lib/actions/user.actions';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
	const { session } = await parent();
	if (!session) {
		redirect(302, '/');
		return;
	}
	const userId = session.user.id;
	const activities = await getActivity(supabase, userId);
	return { activities };
};
