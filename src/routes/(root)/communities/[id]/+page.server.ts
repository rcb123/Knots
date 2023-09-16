import type { Knot } from '$lib/models/knot.model';
import type { PageServerLoad } from './$types';

import { fetchCommunityDetails, fetchCommunityKnots } from '$root/lib/actions/community.actions';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(302, '/');
	}

	const { community: communityDetails } = await fetchCommunityDetails(supabase, params.id);
	const { knots: communityKnots }: { knots: Knot[] } = await fetchCommunityKnots(
		supabase,
		params.id
	);

	return { session, communityDetails, communityKnots };
};
