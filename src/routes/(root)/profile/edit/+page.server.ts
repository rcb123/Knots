import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$db/supabase.types';

import { UserValidation as schema } from '$root/lib/validations/user';
import { updateUser } from '$root/lib/actions/user.actions';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ parent, locals: { supabase } }) => {
	const { session } = await parent();
	const form = await superValidate(schema);

	const { data: user } = await supabase
		.from('users')
		.select(`id, username, name, bio, profile_image`)
		.eq('id', session.user.id)
		.single();

	return { form, user };
};

export const actions = {
	default: async ({
		request,
		url: { pathname: path },
		locals: { supabase, getSession }
	}: {
		request: Request;
		url: URL;
		locals: {
			supabase: SupabaseClient<Database, 'public'>;
			getSession: () => Promise<Session | null>;
		};
	}) => {
		const session = await getSession();
		if (!session) {
			redirect(302, '/login');
			return { status: 401 };
		}
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const id = session.user.id;
		const profile_image = form.data.image;
		const name = form.data.name;
		const username = form.data.username;
		const bio = form.data.bio;

		// check if image has changed and only upload if true

		const payload = {
			id,
			username,
			name,
			bio,
			profile_image,
			path
		};
		await updateUser(supabase, payload);
	}
};
