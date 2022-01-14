import React from 'react'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// Query product
const queryProduct = gql`
    query queryProduct($id: ID!) {
        product(id: $id) {
            desc
            price
            imageUrl
        }
    }
 `

const Product = () => {

    const route = useRouter()

    // use query
    const { data, loading, error } = useQuery(queryProduct, { variables: { id: route.query.productId } })

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
            <button>Add to Cart</button>
        </div>
    )
}

export default Product
