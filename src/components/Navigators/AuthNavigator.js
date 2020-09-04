import React, {createContext, useEffect, useState} from 'react'
import {auth} from 'firebase'
import SignOutStack from './SignOutStack'
import SignInStack from './SignInStack'

export const AuthContext = createContext(null)

const AuthNavigator = () => {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState(null)

    // Handle user state changes
    function onAuthStateChanged(result) {
        setUser(result)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        // unsubscribe on unmount
        return auth().onAuthStateChanged(onAuthStateChanged)
    }, [])

    if (initializing) {
        return null
    }

    return user ? (
        <SignInStack/>
    ) : (
        <SignOutStack/>
    )
}

export default AuthNavigator
