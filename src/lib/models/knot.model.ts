import type { Database } from '$root/db/supabase.types';

export type Knot = Database['public']['Tables']['knots']['Row'];

/*
export type knot = {
	id: string; // Required field, Primary Key
	text: string; // Required field
	author: string; // Foreign Key referencing User
	community: string | null; // Foreign Key referencing community
	created_at: string; // Default to Date.now
	parentId: string | null; // Foreign Key referencing knot (?)
	children: string[] | null // Foreign Key referencing knot;
};
*/
