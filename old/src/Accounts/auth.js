import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./config";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const magic = async (email) => await supabase.auth.signIn({
  email
});

export const loginWithTwitter = async () =>
  await supabase.auth.signIn({
    provider: "twitter",
  });

export const logout = async () => await supabase.auth.signOut();

export const currentUser = () => supabase.auth.user();
