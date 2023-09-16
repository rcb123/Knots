import type { PageServerLoad } from './$types';
import { addCommentToKnot, fetchKnotById, fetchAllChildKnotIds } from '$lib/actions/knot.actions';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	knot: z.string().nonempty('Comment cannot be empty')
});

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const form = await superValidate(schema);
	const knot = await fetchKnotById(supabase, params.id);
	const commentIds = await fetchAllChildKnotIds(supabase, params.id)
	return { knot, commentIds, form };
};

export const actions = {
	default: async ({ params, request, url: { pathname }, locals: { supabase, getSession } }) => {
		const form = await superValidate(request, schema);
		const knotId = params.id;
		const session = await getSession();

		if (!session) {
			throw redirect(302, '/login');
		}

		const userId = session.user.id;

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: Add logic for saving the comment or other operations
		if (form.valid) {
			await addCommentToKnot(supabase, knotId, form.data.knot, JSON.parse(userId), pathname);
		}

		// For now, return success
		return { status: 200 };
	}
};
