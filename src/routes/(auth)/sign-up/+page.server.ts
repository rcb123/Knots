import type { PageServerLoad } from './$types';

import { SignUpValidation as schema } from '$root/lib/validations/user';
import { message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();
	const form = await superValidate(schema);

	// If the user is already logged in return them to the account page
	if (session?.user) {
		throw redirect(302, '/profile');
	}

	return { url: url.origin, session, form };
};

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		const { error } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				emailRedirectTo: `${url.origin}/callback`,
				data: {
					username: form.data.username,
					name: form.data.name,
					bio: form.data.bio
				}
			}
		});

		if (error) {
			return message(form, error.message, { status: 400 });
		}

		return message(form, 'Verification email sent');
	}
};
