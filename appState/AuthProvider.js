import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

// # Authenticaton state
const AuthProvider = ({ children, userData }) => {

    // # User state
    const [user, setUser] = useState(userData)

    // # Accept userInfo from login 
    const setAuthUser = (userInfo) => setUser(userInfo)

    return (
        <AuthContext.Provider value={{ user, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
