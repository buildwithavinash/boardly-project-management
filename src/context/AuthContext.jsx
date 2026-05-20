import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

    const logout = async () => {
        const {error: logoutError} = await supabase.auth.signOut()

        if(logoutError){
            alert("Error in logging out", logoutError.message);
        }

        setUser(null)   
    }
    
    console.log('User: ', user);
    return (
        <AuthContext.Provider value={{user, setUser, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)


