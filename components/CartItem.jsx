import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import fetch from 'isomorphic-unfetch'

import { Me } from './Nav'



const CartItem = ({ cart }) => {

    console.log(cart);
    const {product: { desc, price, imageUrl}, quantity} = cart


    // call useMutation
    // const [updateProduct, { error, loading }] = useMutation(UpdateProduct, {
    //     refetchQueries: [{ query: productQuery }, { query: Me }],
    //     onCompleted: data => {
    //         console.log(data);
    //         if (data) {
    //             setProductData(data.updateProduct)
    //             setSuccess(true)
    //             setEdit(false)
    //         }
    //     }
    // })


    // Handle onSubmit
    const handleSubmit = async () => {


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
                <button style={{ cursor: 'pointer', margin: '5px', padding: '5px 10px', border: 'none', background: 'red' }}>Delete</button>
            </div>

        </div>
    )
}

export default CartItem
