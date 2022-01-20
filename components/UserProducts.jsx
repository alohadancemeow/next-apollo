import React, { useContext } from 'react'

import UserProductItem from './UserProductItem'
import { AuthContext } from '../appState/AuthProvider'


const UserProducts = () => {

    const { user } = useContext(AuthContext)
    // console.log(user);

    // const { data, loading, error } = useQuery(Me, { fetchPolicy: 'no-cache' })
    // console.log('me', data);

    return (
        <div style={{ width: '70%', margin: 'auto' }}>

            {/* // todo: table */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 2fr', width: '100%', borderBottom: '2px solid gray', margin: '10px 0' }}>
                <h3 style={{ margin: 'auto' }}>Description</h3>
                <h3 style={{ margin: 'auto' }}>Picture</h3>
                <h3 style={{ margin: 'auto' }}>Price</h3>
                <h3 style={{ margin: 'auto' }}>Actions</h3>
            </div>

            {/* //todo: body --> show user product */}
            {user && user.products.length > 0 && user.products.map(item => (
                <UserProductItem key={item.id} product={item} />
            ))}

        </div >
    )
}

export default UserProducts
