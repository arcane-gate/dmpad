export const signup = ({ email, password }) =>
  supabase.auth.signUp({
    email,
    password,
  });

export const login = ({ email, password }) =>
  supabase.auth.signIn({
    email,
    password,
  });

export const logout = () => supabase.auth.signOut();
