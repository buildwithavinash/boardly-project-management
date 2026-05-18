import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { data } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [ user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        supabase.auth.getSession().then(({data : {session} }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        })

        // session change

        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])
    
    console.log('User: ', user);
    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)


