import React, { useState } from 'react'
import Link from 'next/link'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// create signup mutation
const SignUpMutation = gql`
    mutation SignUpMutation($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

const SignUp = () => {

    // # User State
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    // console.log(userInfo)

    // # Success state
    const [success, setSuccess] = useState(false)


    // use mutation
    const [signup, { loading, error, data }] = useMutation(SignUpMutation, {
        variables: { ...userInfo },
        onCompleted: data => {
            console.log(data);

            if (data) {
                setSuccess(true)
                setUserInfo({
                    name: '',
                    email: '',
                    password: ''
                })
            }
        }
    })

    // Handle onChange
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    // Handle onSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await signup()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='signup-form'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name='name' placeholder='username' value={userInfo.name} onChange={handleChange} />
                <input type="text" name='email' placeholder='email' value={userInfo.email} onChange={handleChange} />
                <input type="password" name='password' placeholder='password' value={userInfo.password} onChange={handleChange} />
                <button type='submit' className='signup-btn' disabled={loading}>Submit</button>
            </form>

            {/* //todo: when success and error */}
            <div className='noti-text'>
                {success &&
                    <p>
                        You successfully signed up, please {" "}
                        <Link href="/signin">
                            <a>
                                <span className='normal'>login.</span>
                            </a>
                        </Link>
                    </p>
                }

                {error &&
                    <p style={{ color: 'red' }}>
                        {error.graphQLErrors[0].message}
                    </p>
                }
            </div>

        </div>
    )
}

export default SignUp
