import { supabase } from "./supabase";

export async function fetchStudyRecords() {
  const { data } = await supabase.from("study-record").select();
  return data;
}
