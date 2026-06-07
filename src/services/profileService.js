import { supabase } from "../lib/supabase";

export const getMembers = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name")
    .eq("role", "member");
  return { data, error };
};
