import React from 'react'
import Link from 'next/link'

const fakeData = [
    {
        id: 1,
        desc: 'Product1',
        price: 150.00,
        imageUrl: 'https://images.unsplash.com/photo-1536998003793-b13c28fae74b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80'
    },
    {
        id: 2,
        desc: 'Product2',
        price: 150.00,
        imageUrl: 'https://images.unsplash.com/photo-1536513953700-ba24c78a5f51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80'
    },
    {
        id: 3,
        desc: 'Product3',
        price: 150.00,
        imageUrl: 'https://images.unsplash.com/photo-1536998003793-b13c28fae74b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80'
    },
]


const products = () => {
    return (
        <div className='product-list'>
            {fakeData.map(item => (
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

export default products
