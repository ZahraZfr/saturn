import React from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
const AuthCountext = createContext(null)


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const SignIn = (username , callback) => {
        setUser(username)
        callback()
    }

    const SignOut = () => {
        setUser(null)
    }
    return <AuthCountext.Provider value={{
        User: user,
        SignIn,
        SignOut
    }}>
        {children}
    </AuthCountext.Provider>
}

export default AuthProvider

export const useAuth = () => useContext(AuthCountext)