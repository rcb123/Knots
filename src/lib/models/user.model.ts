import type { Database } from '$root/db/supabase.types';

export type User = Database['public']['Tables']['users']['Row'];

/*
export type User = {
	id: string; // Required field, Primary Key
	username: string; // Required field, Unique field
	name: string; // Required field
	profile_image: string | null;
	bio: string | null;
	knots: string[] | null; // Foreign Key referencing knot
	communities: string[] | null;// Foreign Key referencing Community
	created_at: string;
	updated_at: string;
};
*/
