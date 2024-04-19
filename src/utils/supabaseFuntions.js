import { supabase } from "./supabase";

export async function fetchStudyRecords() {
  const { data } = await supabase.from("study-record").select();
  return data;
}

export async function insertStudyRecord(newRecord) {
  await supabase.from("study-record").insert(newRecord).select();
}

export async function deleteStudyRecord(id) {
  await supabase.from("study-record").delete().eq("id", id);
}
