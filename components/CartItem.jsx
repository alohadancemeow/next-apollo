import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Me } from './Nav'

// create delete cart Mutation
const DeleteCart = gql`
    mutation Mutation($id: ID!) {
        deleteCart(id: $id) {
                id
            }
        }
`

const CartItem = ({ cart }) => {

    console.log("cart", cart);
    const { id, product: { desc, price, imageUrl }, quantity } = cart

    // call useMutation
    const [deleteCart, { error, loading }] = useMutation(DeleteCart, {
        refetchQueries: [{ query: Me }],
        onCompleted: data => {
            console.log(data);

        }
    })


    // Handle onSubmit
    const handleSubmit = async () => {
        try {
            await deleteCart({ variables: { id } })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr', width: '100%', borderBottom: '1px solid gray', margin: '10px 0' }} >

            <div style={{ margin: 'auto' }}>
                <p>{desc}</p>
            </div>
            <div style={{ margin: 'auto' }}>
                <img src={imageUrl} alt={desc} width='50px' />
            </div>
            <div style={{ margin: 'auto' }}>
                <p>{price}</p>
            </div>
            <div style={{ margin: 'auto' }}>
                <p>{quantity}</p>
            </div>
            <div style={{ margin: 'auto' }}>
                <p>{quantity * price}</p>
            </div>

            <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button
                    onClick={handleSubmit}
                    style={{ cursor: 'pointer', margin: '5px', padding: '5px 10px', border: 'none', background: 'red' }}
                >
                    {loading ? "Deleting..." : error ? 'Error' : ' Delete'}
                </button>
            </div>

        </div>
    )
}

export default CartItem
