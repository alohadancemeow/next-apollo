import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { productQuery } from './Products'

// create product mutation
const CreateProduct = gql`
    mutation Mutation($desc: String!, $price: Float!, $imageUrl: String!) {
        createProduct(desc: $desc, price: $price, imageUrl: $imageUrl) {
            id
            desc
            price
            imageUrl
            user {
                name
            }
            createdAt
        }
    }
`

const ManageProduct = () => {

    // # Product state
    const [productData, setProductData] = useState({
        desc: '',
        price: '',
        imageUrl: ''
    })

    // call useMutation
    const [createProduct, { error, loading }] = useMutation(CreateProduct, {
        variables: { ...productData, price: +productData.price },
        refetchQueries: [{ query: productQuery }],
        onCompleted: data => {
            // console.log(data);
            if (data) setProductData({ desc: '', price: '', imageUrl: '' })
        }
    })

    // Handle onChange
    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        })
    }

    // Handle onSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await createProduct()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='signup-form'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name='desc' placeholder='desc' value={productData.desc} onChange={handleChange} />
                <input type="number" name='price' placeholder='price' value={productData.price} onChange={handleChange} />
                <input type="text" name='imageUrl' placeholder='image' value={productData.imageUrl} onChange={handleChange} />
                <button type='submit' className='signup-btn'>
                    Submit {loading ? 'ting...' : ''}
                </button>
            </form>

            {/* //todo: when success and error */}
            <div className='noti-text'>
                {/* {success &&
                    <p>
                        You successfully signed up, please {" "}
                        <Link href="/signin">
                            <a>
                                <span className='normal'>login.</span>
                            </a>
                        </Link>
                    </p>
                } */}

                {error &&
                    <p style={{ color: 'red' }}>
                        {error.graphQLErrors[0].message}
                    </p>
                }

            </div>

        </div>
    )
}

export default ManageProduct
