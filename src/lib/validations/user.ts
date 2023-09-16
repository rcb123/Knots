import * as z from 'zod';

export const UserValidation = z.object({
	username: z
		.string()
		.min(3, { message: 'Minimum 3 characters.' })
		.max(30, { message: 'Maximum 30 characters.' }),
	name: z
		.string()
		.min(3, { message: 'Minimum 3 characters.' })
		.max(30, { message: 'Maximum 30 characters.' }),
	bio: z
		.string()
		.min(3, { message: 'Minimum 3 characters.' })
		.max(1000, { message: 'Maximum 1000 characters.' }),
	image: z.string()
});

export const LoginValidation = z.object({
	email: z
		.string()
		.email({ message: 'Email must be a valid email address' })
		.nonempty({ message: 'Email is required' })
		.max(64, { message: 'Email must be less than 64 characters' }),
	password: z
		.string()
		.nonempty({ message: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
});

export const SignUpValidation = z
	.object({
		email: z
			.string()
			.email({ message: 'Email must be a valid email address' })
			.nonempty({ message: 'Email is required' })
			.max(64, { message: 'Email must be less than 64 characters' }),
		password: z
			.string()
			.nonempty({ message: 'Password is required' })
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(32, { message: 'Password must be less than 32 characters' }),
		confirmPassword: z
			.string()
			.nonempty({ message: 'Confirm password is required' })
			.min(6, { message: 'Confirm password must be at least 6 characters' })
			.max(32, { message: 'Confirm password must be less than 32 characters' }),
		username: z
			.string()
			.nonempty({ message: 'Username is required' })
			.min(3, { message: 'Minimum 3 characters.' })
			.max(30, { message: 'Maximum 30 characters.' }),
		name: z
			.string()
			.nonempty({ message: 'Name is required' })
			.min(3, { message: 'Minimum 3 characters.' })
			.max(30, { message: 'Maximum 30 characters.' }),
		bio: z
			.string()
			.nonempty({ message: 'Bio is required' })
			.min(3, { message: 'Minimum 3 characters.' })
			.max(1000, { message: 'Maximum 1000 characters.' }),
		terms: z.string()
	})
	.refine((data) => data.password == data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword']
	});
