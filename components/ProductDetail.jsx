import React, { useContext } from 'react'
import Router, { useRouter } from 'next/router'
import { AuthContext } from '../appState/AuthProvider'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AddToCart } from './ProductItem'
import { Me } from './Nav'

// Query product
const queryProduct = gql`
    query queryProduct($id: ID!) {
        product(id: $id) {
            id
            desc
            price
            imageUrl
        }
    }
 `

const ProductDetail = () => {

    // get user from Authentication state
    const { user } = useContext(AuthContext)

    const route = useRouter()

    // use query
    const { data, loading, error } = useQuery(queryProduct, { variables: { id: route.query.productId } })

    // call useMutation
    const [addToCart] = useMutation(AddToCart, {
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

    // check error
    if (error) return <p>Ooops.. something went wrong.</p>
    // check loading
    if (loading) return <p>Loading...</p>

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '30px'

            }}
        >
            <img
                src={data.product.imageUrl}
                alt={data.product.desc}
                width="350px"
            />
            <h1>{data.product.desc}</h1>
            <h3>{data.product.price}</h3>
            <button onClick={() => handleAddToCart(data.product.id)}>
                {loading ? 'Adding...' : 'Add to Cart'}
            </button>
        </div>
    )
}

export default ProductDetail
