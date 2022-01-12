import React from 'react'
import SignIn from '../components/Signin'
import apolloclient from '../apollo/apolloclient'

const SigninPage = () => {
    return (
        <SignIn />
    )
}

export default apolloclient(SigninPage)
