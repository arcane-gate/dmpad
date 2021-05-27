import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./config";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const forgotPass = (email) =>
  supabase.auth.api.resetPasswordForEmail(email);

export const signup = (email, password) =>
  supabase.auth.signUp({
    email,
    password,
  });

export const login = (email, password) =>
  supabase.auth.signIn({
    email,
    password,
  });

export const loginWithTwitter = () =>
  supabase.auth.signIn({
    provider: "twitter",
  });

export const logout = () => supabase.auth.signOut();

export const currentUser = () => Promise.resolve(supabase.auth.user());
