import type { Database } from '$root/db/supabase.types';

export type Community = Database['public']['Tables']['communities']['Row'];

/*
export type Community = {
	id: string; // Required field, Primary Key
	username: string; // Required field, Unique field
	name: string; // Required field
	image: string | null;
	bio: string | null;
	created_at: string;
	created_by: string; // Foreign Key referencing User
	knots: string[] | null; // Foreign Key referencing knot
	members: string[] | null; // Foreign Key referencing User
};
*/

export type CommunityMember = {
	community_id: string; // Foreign Key referencing Community
	user_id: string; // Foreign Key referencing User
};

export type Communityknot = {
	community_id: string; // Foreign Key referencing Community
	knot_id: string; // Foreign Key referencing knot
};
