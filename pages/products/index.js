import React from 'react'
import Link from 'next/link'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import apolloclient from '../../apollo/apolloclient'

// create query
const productQuery = gql`
    query {
        products {
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


const products = () => {

    // fetching data from database,
    const { data, loading, error } = useQuery(productQuery)

    // check error
    if (error) return <p>Ooops.. something went wrong.</p>
    // check loading
    if (loading) return <p>Loading...</p>

    return (
        <div className='product-list'>
            {data.products.map(item => (
                <div key={item.id} className='product-item'>
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
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    )
}

export default apolloclient(products)
