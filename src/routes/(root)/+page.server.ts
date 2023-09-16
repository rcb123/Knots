import type { PageServerLoad } from './$types';
import { fetchKnots } from '$lib/actions/knot.actions';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
	const pathname = url.pathname;
	const pageParam = url.searchParams.get('page');
	const pageNumber = pageParam ? +pageParam : 1;
	const { knots, isNext } = await fetchKnots(supabase, pageNumber, 30);

	return { knots, isNext, pageNumber, pathname };
};
