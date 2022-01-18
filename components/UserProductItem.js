import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import fetch from 'isomorphic-unfetch'

import { productQuery } from './Products'
import { Me } from './UserProducts'

// update product mutation
const UpdateProduct = gql`
    mutation Mutation($id: ID!, $desc: String, $price: Float, $imageUrl: String) {
        updateProduct(id: $id, desc: $desc, price: $price, imageUrl: $imageUrl) {
            id
            desc
            price
            imageUrl
            user {
                id
                name
            }
            createdAt
        }
    }
`

const UserProductItem = ({ product }) => {

    // # States
    const [edit, setEdit] = useState(false)
    const [file, setFile] = useState('')
    const [success, setSuccess] = useState(false)
    const [productData, setProductData] = useState(product)

    // call useMutation
    const [updateProduct, { error, loading }] = useMutation(UpdateProduct, {
        refetchQueries: [{ query: productQuery }, { query: Me }],
        onCompleted: data => {
            console.log(data);
            if (data) {
                setProductData(data.updateProduct)
                setSuccess(true)
                setEdit(false)
            }
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
    const handleSubmit = async () => {

        // no file
        if (!file && productData === product) {
            setProductData(product)
            return setEdit(false)
        }

        console.log(productData);

        try {
            // call updateProduct with productData
            if (file) {

                // get url image from cloudinary
                const url = await uploadFile()

                // new imageUrl
                if (url) {
                    await updateProduct({
                        variables: {
                            ...productData,
                            imageUrl: url,
                            price: +productData.price
                        }
                    })
                }
            } else {
                await updateProduct({
                    variables: {
                        ...productData,
                        imageUrl: productData.imageUrl,
                        price: +productData.price
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }

    }

    // Handle selected file
    const selectFile = (e) => {
        const files = e.target.files
        // console.log(files);
        setFile(files[0])
    }


    // upload file to cloudinary,
    // append file to graphql-basic folder
    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'graphql-basic')

        // curl https://api.cloudinary.com/v1_1/demo/image/upload 
        const response = await fetch('https://api.cloudinary.com/v1_1/the-rabbit-team/image/upload', {
            method: 'post',
            body: data
        })

        const result = await response.json()
        // console.log(result)
        return result.url
    }


    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 2fr', width: '100%', borderBottom: '1px solid gray', margin: '10px 0' }} >

            <div style={{ margin: 'auto' }}>
                {!edit
                    ? <p>{productData.desc}</p>
                    : <input style={{ margin: "2px", height: "25px", width: '8rem' }} type='text' name='desc' value={productData.desc} onChange={handleChange} />
                }
            </div>
            <div style={{ margin: 'auto' }}>
                {!edit
                    ? <img src={productData.imageUrl} alt={product.desc} width='50px' />
                    : <input style={{ margin: "2px", height: "25px", width: '12rem' }} type="file" name='file' onChange={selectFile} />
                }
            </div>
            <div style={{ margin: 'auto' }}>
                {!edit
                    ? <p>{productData.price}</p>
                    : <input style={{ margin: "2px", height: "25px", width: '5rem' }} type="number" name='price' value={productData.price} onChange={handleChange} />
                }
            </div>

            <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {!edit
                    ? <>
                        <button onClick={() => setEdit(true)} style={{ cursor: 'pointer', margin: '5px', padding: '5px 10px', border: 'none', background: 'orange' }}>Edit</button>
                        <button style={{ cursor: 'pointer', margin: '5px', padding: '5px 10px', border: 'none', background: 'red' }}>Delete</button>
                    </>
                    : <>
                        <button
                            onClick={() => {
                                setProductData(product)
                                setEdit(false)
                            }}
                            style={{ cursor: 'pointer', margin: '5px', padding: '5px 10px', border: 'none', background: 'red' }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            style={{ cursor: 'pointer', margin: '5px', padding: '5px 10px', border: 'none', background: 'green' }}
                        >
                            {loading ? 'Editting...' : 'Confirm'}
                        </button>
                    </>
                }
            </div>

        </div>
    )
}

export default UserProductItem
