import { supabase } from "./supabase";

export async function fetchStudyRecords() {
  const { data } = await supabase.from("study-record").select();
  return data;
}

export async function insertStudyRecord(newRecord) {
  const { data } = await supabase
    .from("study-record")
    .insert(newRecord)
    .select();
  return data;
}
