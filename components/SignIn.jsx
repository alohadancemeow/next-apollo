import React, { useState } from 'react'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'

// create signin mutation
const SignInMutation = gql`
   mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
                name
                email
                products {
                    id
                    }
                carts {
                    id
                    product {
                        desc
                        price
                        imageUrl
                    }
                    quantity
                }
            }
            jwt
        }
    }
`

const SignIn = () => {

    // # User State
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    // use mutation
    const [login, { loading, error, data }] = useMutation(SignInMutation, {
        variables: { ...userInfo },
        onCompleted: data => {
            // console.log(data);

            if (data) {

                //set cookie in browser
                Cookies.set('jwt', data.login.jwt)

                setUserInfo({
                    email: '',
                    password: ''
                })
                Router.push('/products')
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
            await login()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='signup-form'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name='email' placeholder='email' value={userInfo.email} onChange={handleChange} />
                <input type="text" name='password' placeholder='password' value={userInfo.password} onChange={handleChange} />
                <button type='submit' className='signup-btn' disabled={loading}>Submit</button>
            </form>

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

export default SignIn
