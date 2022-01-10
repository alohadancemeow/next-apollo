import React from 'react'
import Link from 'next/link'

const fakeData = [
    {
        id: 1,
        desc: 'Product1',
        price: 150.00
    },
    {
        id: 2,
        desc: 'Product2',
        price: 150.00
    },
    {
        id: 3,
        desc: 'Product3',
        price: 150.00
    },
]


const products = () => {
    return (
        <div>
            {fakeData.map(item => (
                <Link
                    key={item.id}
                    href="/products[productId]"
                    as={`products/${item.id}`}
                >
                    <a>
                        <div>{item.desc}</div>
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default products
