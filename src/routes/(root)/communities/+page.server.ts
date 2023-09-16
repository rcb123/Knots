import type { PageServerLoad } from './$types';
import { fetchCommunities } from '$root/lib/actions/community.actions';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
	const searchString = url.searchParams.get('q') || '';
	const pageString = url.searchParams?.get('page');
	const pageNumber = pageString ? +pageString : 1;
	const pageSize = 25;
	const { suggestedCommunities, isNext } = await fetchCommunities(supabase, {
		searchString,
		pageNumber,
		pageSize
	});
	const communities = suggestedCommunities
	return { communities, isNext, pageNumber };
};
