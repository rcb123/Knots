import { createKnot } from '$lib/actions/knot.actions';
import { superValidate } from 'sveltekit-superforms/server';
import { knotValidation } from '$lib/validations/knot';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(knotValidation);
	return { form };
};

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(302, '/login');
		}
		const form = await superValidate(request, knotValidation);

		if (!form.valid) {
			return { status: 400, body: { form } };
		}

		const text = form.data.knot;
		await createKnot(
			supabase,
			text,
			session?.user.id,
			null, // TODO: Finish implementing community functionality
		);
		// TODO: Do invalidate(path); on client side, won't work on server
		throw redirect(302, '/');
	}
};
