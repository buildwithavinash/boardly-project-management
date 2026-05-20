import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      getUserData(session);
      setLoading(false);
    });

    async function getUserData(session) {
      if (!session) return;

      const { data: userData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id);
      console.log("user data", userData);

      if (userData) setRole(userData[0].role);
    }

    // session change

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      getUserData(session)
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      alert("Error in logging out", logoutError.message);
    }

    setUser(null);
  };

  console.log("User: ", user);
  console.log(role);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
