import React, { useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../appState/AuthProvider'
import { Me } from './Nav'

// create add to cart mutation
export const AddToCart = gql`
    mutation Mutation($id: ID!) {
        addToCart(id: $id) {
            id
            product {
                id
                desc
                price
                imageUrl
            }
            quantity
            user {
                id
                name
            }
        }
    }   
`

const ProductItem = ({ item }) => {

    // get user from Authentication state
    const { user } = useContext(AuthContext)
    // console.log(user);

    // call useMutation
    const [addToCart, { loading, error }] = useMutation(AddToCart, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries: [{ query: Me }]
    })

    // handle add to cart
    const handleAddToCart = async (id) => {
        // console.log(id);

        // check user
        if (!user) Router.push('/signin')

        // add item to cart by id
        try {
            await addToCart({ variables: { id } })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='product-item'>
            <Link
                href="/products[productId]"
                as={`products/${item.id}`}
            >
                <a>
                    <img src={item.imageUrl} alt={item.desc} width="250px" />
                </a>
            </Link>
            <h3>{item.desc}</h3>
            <h4>{item.price + " THB"}</h4>

            {/* //todo: check if user is the owner */}
            {user && user.id === item.user.id
                ? <button onClick={() => Router.push('/manageProduct')}>Manage</button>
                : <button onClick={() => handleAddToCart(item.id)}>{loading ? 'Adding...' : 'Add to Cart'}</button>
            }
        </div>
    )
}

export default ProductItem
