import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../appState/AuthProvider'

// create a logged in user query
export const Me = gql`
    query Query {
        user {
            id
            name
            email
            products {
                id
                desc
                price
                imageUrl
                createdAt
            }
            carts {
                id
                product {
                    id
                    desc
                    imageUrl
                    price
                }
                quantity
                createdAt
            }
        }
    }  
`

const Nav = () => {

    // get user from authentiaction state
    const { user, signout, setAuthUser } = useContext(AuthContext)
    // console.log(user);

    const { data } = useQuery(Me)
    // console.log('me', data);

    // # Data effect
    useEffect(() => {
        if (data) setAuthUser(data.user)
    }, [data])

    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/products">
                        <a>Products</a>
                    </Link>
                </li>

                { //todo: Authenticated
                    user &&
                    <>
                        <li>
                            <Link href="/manageProduct">
                                <a>Manage Product</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart">
                                <a>Cart {" "}
                                    <span style={{ background: 'red', color: 'white', padding: '3px 10px', borderRadius: '9px' }}>
                                        {user && user.carts && user.carts.length === 0
                                            ? 0
                                            : user.carts.reduce((sum, item) => sum + item.quantity, 0)
                                        }
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <button onClick={signout}>Sign Out</button>
                    </>
                }

                { //todo: Not Authenticated
                    !user &&
                    <>
                        <li>
                            <Link href="/signin">
                                <a>Sign In</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
                                <a>Sign Up</a>
                            </Link>
                        </li>
                    </>
                }

            </ul>
        </nav>
    )
}

export default Nav
