import React, { useContext } from 'react'
import Link from 'next/link'

import { AuthContext } from '../appState/AuthProvider'

const Nav = () => {

    // get user from authentiaction state
    const { user, signout } = useContext(AuthContext)
    // console.log(user);

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
                            <Link href="/cart">
                                <a>Cart</a>
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
