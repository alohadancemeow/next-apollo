import React from 'react'

import apolloclient from '../apollo/apolloclient'
import SignUp from '../components/SignUp'

const SignupPage = () => {
    return (
        <SignUp />
    )
}

export default apolloclient(SignupPage)
