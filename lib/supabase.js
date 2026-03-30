import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://TON-PROJET.supabase.co";
const SUPABASE_ANON_KEY = "TON-ANON-KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
