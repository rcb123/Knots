import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session) {
		throw redirect(302, '/login');
	}
	const userId = session.user.id;
	throw redirect(302, `/profile/${userId}`);
};
