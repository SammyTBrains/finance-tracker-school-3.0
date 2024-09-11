import { SUPABASE_KEY, SUPABASE_URL } from "@/env";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
