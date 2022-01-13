import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'


// create request for reset password mutation
// const ResetPassword = gql`
//     mutation ResetPassword($email: String!) {
//         resetPassword(email: $email) {
//             message
//         }
//     }
// `

const ResetPasswordPage = () => {
    
    // # Email state
    const [password, setPassword] = useState('')
    // const [message, setMessage] = useState('')

    const router = useRouter()
    console.log(router.query);

    // call useMutation
    // const [requestResetPassword, { loading, error }] = useMutation(ResetPassword, {
    //     variables: { email },
    //     onCompleted: data => {
    //         console.log(data)
    //         if (data) {
    //             setMessage(data.requestResetPassword.message)
    //         }
    //     }
    // })

    // Handle onChange
    const handleChange = (e) => {
        setPassword(e.target.value)
    }

    // Handle onSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            // await requestResetPassword()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='signup-form'>

            <div className="noti-text">Please enter your new password below.</div>

            <form action="" onSubmit={handleSubmit}>
                <input type="password" name='password' placeholder='new password' value={password} onChange={handleChange} />
                <button type='submit' className='signup-btn'  >Submit</button>
            </form>

            {/* //todo: show message */}
            {/* <div className='noti-text'>
                {message &&
                    <p style={{ color: 'blue' }}>
                        {message}
                    </p>
                }
            </div> */}

            {/* //todo: when got error */}
            {/* <div className='noti-text'>
                {error &&
                    <p style={{ color: 'red' }}>
                        {error.graphQLErrors[0].message}
                    </p>
                }
            </div> */}

        </div>
    )
}

export default ResetPasswordPage
