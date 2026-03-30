import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jafhpkbtxcmzufznnbxc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_x6fpUPoiRmETpw3kZP1v7A_EvCpuliH";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
