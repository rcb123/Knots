import type { Knot } from '$root/lib/models/knot.model.js';
import type { PageServerLoad } from './$types.js';

import { fetchUserKnots } from '$root/lib/actions/user.actions.js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(302, '/');
	}

	const id = params.id;

	// Turn these into functions and return the functions in the form a: a() so that they
	// load at the same time
	const { data: user, error: userError } = await supabase
		.from('users')
		.select(`id, name, username, bio, profile_image`)
		.eq('id', session.user.id)
		.single();

	if (!user) throw userError;

	const { data: account, error: accountError } = await supabase
		.from('users')
		.select(`id, name, username, bio, profile_image`)
		.eq('id', id)
		.single();

	if (!account) throw accountError;

	const userKnots = (await fetchUserKnots(supabase, account.id)) as Knot[];

	return { session, user, account, userKnots };
};
