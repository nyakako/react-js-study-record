﻿import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);
