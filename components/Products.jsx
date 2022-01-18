import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import ProductItem from './ProductItem'

// create query
export const productQuery = gql`
    query {
        products {
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


const Products = () => {

    // fetching data from database,
    const { data, loading, error } = useQuery(productQuery)

    // check error
    if (error) return <p>Ooops.. something went wrong.</p>
    // check loading
    if (loading) return <p>Loading...</p>

    return (
        <div className='product-list'>
            {data.products.map(item => (
                <ProductItem key={item.id} item={item} />
            ))}
        </div>
    )
}

export default Products
