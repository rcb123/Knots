// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Database } from "./db/supabase.types";

import { SupabaseClient, Session } from "@supabase/supabase-js";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		interface Supabase {
			Database: import('$lib/supabase').Database;
			SchemaName: 'public';
		}
		// interface Platform {}
	}
}

export {};
