import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import fetch from 'isomorphic-unfetch'

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

    // # States
    const [file, setFile] = useState('')
    const [success, setSuccess] = useState(false)
    const [productData, setProductData] = useState({
        desc: '',
        price: '',
        imageUrl: ''
    })

    // call useMutation
    const [createProduct, { error, loading }] = useMutation(CreateProduct, {
        refetchQueries: [{ query: productQuery }],
        onCompleted: data => {
            // console.log(data);
            if (data) {
                setProductData({ desc: '', price: '', imageUrl: '' })
                setSuccess(true)
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
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            // get url image from cloudinary
            const url = await uploadFile()

            // call createProduct with productData
            if (url) {
                await createProduct({
                    variables: {
                        ...productData,
                        imageUrl: url,
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
        <div className='signup-form'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name='desc' placeholder='desc' value={productData.desc} onChange={handleChange} />
                <input type="number" name='price' placeholder='price' value={productData.price} onChange={handleChange} />

                <input
                    type="file"
                    name='file'
                    placeholder='image'
                    value={file[file.name]}
                    onChange={selectFile}
                />

                <button
                    type='submit'
                    className='signup-btn'
                    disabled={!productData.desc || !file || !productData.price || loading}
                >
                    Submit {loading ? 'ting...' : ''}
                </button>
            </form>

            {/* //todo: when success and error */}
            <div className='noti-text'>
                {success &&
                    <p style={{ color: 'green' }}>
                        Created successfully .
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

export default ManageProduct
