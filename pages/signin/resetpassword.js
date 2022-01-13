import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'


// create request for reset password mutation
const RequestResetPassword = gql`
    mutation RequestResetPassword($email: String!) {
        requestResetPassword(email: $email) {
            message
        }
    }
`

const ResetPaawordPage = () => {

    // # Email state
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    // call useMutation
    const [requestResetPassword, { loading, error }] = useMutation(RequestResetPassword, {
        variables: { email },
        onCompleted: data => {
            console.log(data)
            if (data) {
                setMessage(data.requestResetPassword.message)
            }
        }
    })

    // Handle onChange
    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    // Handle onSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await requestResetPassword()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='signup-form'>

            <div className="noti-text">Please enter your email to proceed reset password</div>

            <form action="" onSubmit={handleSubmit}>
                <input type="text" name='email' placeholder='email' value={email} onChange={handleChange} />
                <button type='submit' className='signup-btn' disabled={loading} >Submit</button>
            </form>

            {/* //todo: show message */}
            <div className='noti-text'>
                {message &&
                    <p style={{ color: 'blue' }}>
                        {message}
                    </p>
                }
            </div>

            {/* //todo: when got error */}
            <div className='noti-text'>
                {error &&
                    <p style={{ color: 'red' }}>
                        {error.graphQLErrors[0].message}
                    </p>
                }
            </div>

        </div>
    )
}

export default ResetPaawordPage
