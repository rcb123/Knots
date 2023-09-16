import type { PageServerLoad } from './$types';

import { LoginValidation as schema } from '$root/lib/validations/user';
import { message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();
	const form = await superValidate(schema);

	// if the user is already logged in return them to the profile page
	if (session?.user) {
		throw redirect(302, '/account');
	}

	return { url: url.origin, session, form };
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		const { error } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error) {
			return message(form, error.message, { status: 400 });
		}

		throw redirect(302, '/profile');
	}
};
