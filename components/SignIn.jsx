import React, { useState, useContext } from 'react'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'

import { AuthContext } from '../appState/AuthProvider'

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
                    desc
                    price
                    imageUrl
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
                orders {
                    id
                    items {
                        product {
                        desc
                        price
                        imageUrl
                        }
                    quantity
                    }
                }
                cards {
                    id
                    cardInfo {
                        id
                        expiration_month
                        expiration_year
                        brand
                        last_digits
                    }
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

    // call useContext
    const { setAuthUser } = useContext(AuthContext)

    // call useMutation
    const [login, { loading, error, data }] = useMutation(SignInMutation, {
        variables: { ...userInfo },
        onCompleted: data => {

            if (data) {

                // set user to authentication state
                setAuthUser(data.login.user)

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
                <input type="password" name='password' placeholder='password' value={userInfo.password} onChange={handleChange} />
                <button type='submit' className='signup-btn' disabled={loading}>Submit</button>
            </form>

            {/* //todo: forgot password */}
            <div className='noti-text'>
                <p>
                    Forget password? {" "}
                    <span
                        style={{ color: 'orange', cursor: 'pointer' }}
                        onClick={() => Router.push('/signin/requestresetpassword')}
                    >
                        Click here
                    </span>
                </p>
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

export default SignIn
