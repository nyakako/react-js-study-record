import { supabase } from "./supabase";

export async function fetchStudyRecords() {
  const { data } = await supabase.from("study-record").select();
  return data;
}

export async function insertStudyRecord(newRecord) {
  const { data, error } = await supabase
    .from("study-record")
    .insert(newRecord)
    .select();
  return { data, error };
}

export async function deleteStudyRecord(id) {
  await supabase.from("study-record").delete().eq("id", id);
}
