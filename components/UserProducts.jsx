import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// create a logged in user query
export const Me = gql`
    query Query {
        user {
            id
            name
            email
            products {
                id
                desc
                price
                imageUrl
                createdAt
            }
        }
    }  
`

const UserProducts = () => {

    const { data, loading, error } = useQuery(Me)
    // console.log('me', data);

    return (
        <div style={{ width: '50%', margin: 'auto' }}>

            {/* // todo: table */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', width: '100%', borderBottom: '2px solid gray', margin: '10px 0' }}>
                <h3 style={{ margin: 'auto' }}>Description</h3>
                <h3 style={{ margin: 'auto' }}>Picture</h3>
                <h3 style={{ margin: 'auto' }}>Price</h3>
                <h3 style={{ margin: 'auto' }}>Actions</h3>
            </div>

            {/* //todo: body --> show user product */}
            {data && data.user && data.user.products.length > 0 && data.user.products.map(item => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', width: '100%', borderBottom: '1px solid gray', margin: '10px 0' }} >
                    <div style={{ margin: 'auto' }}><p>{item.desc}</p></div>
                    <div style={{ margin: 'auto' }}><img src={item.imageUrl} alt={item.desc} width='50px' /></div>
                    <div style={{ margin: 'auto' }}><p>{item.price}</p></div>
                    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button style={{ cursor: 'pointer', padding: '5px 10px', border: 'none', background: 'orange' }}>Edit</button>
                        <button style={{ cursor: 'pointer', padding: '5px 10px', border: 'none', background: 'red' }}>Delete</button>
                    </div>
                </div>
            ))}

        </div >
    )
}

export default UserProducts
