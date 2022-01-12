import React, { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'

// # Create context
export const AuthContext = createContext()

// # Authenticaton state
const AuthProvider = ({ children, userData }) => {

    // # Logout Eeffect
    useEffect(() => {

        // listening for logout
        const syncLogout = (e) => {
            if (e.key === 'logout') {
                setUser(null)
                Router.push('/products')
            }
        }
        window.addEventListener('storage', syncLogout)

        // then remove event and storage key
        return () => {
            window.removeEventListener('storage', syncLogout)
            window.localStorage.removeItem('logout')
        }
    }, [])

    // # User state
    const [user, setUser] = useState(userData)

    // # Accept userInfo from login 
    const setAuthUser = (userInfo) => setUser(userInfo)

    // # Sign out
    const signout = () => {

        // remove token, empty user data,
        // set logout key in localStorage
        Cookies.remove('jwt')
        setUser(null)
        localStorage.setItem('logout', Date.now())
        Router.push('/products')
    }

    return (
        <AuthContext.Provider value={{ user, setAuthUser, signout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
