import React, { useContext } from 'react'

import CartItem from './CartItem'
import { AuthContext } from '../appState/AuthProvider'


const Carts = () => {

    const { user } = useContext(AuthContext)
    // console.log(user);

    return (
        <div style={{ width: '70%', margin: 'auto' }}>

            {/* // todo: table */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr', width: '100%', borderBottom: '2px solid gray', margin: '10px 0' }}>
                <h3 style={{ margin: 'auto' }}>Description</h3>
                <h3 style={{ margin: 'auto' }}>Picture</h3>
                <h3 style={{ margin: 'auto' }}>Price</h3>
                <h3 style={{ margin: 'auto' }}>Quantity</h3>
                <h3 style={{ margin: 'auto' }}>Amount</h3>
                <h3 style={{ margin: 'auto' }}>Actions</h3>
            </div>

            {/* //todo: body --> show user product */}
            {user && user.carts.length > 0 && user.carts.map(item => (
                <CartItem key={item.id} cart={item} />
            ))}

            {/* //todo: show total amount */}
            <>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr', width: '100%', borderBottom: '2px solid gray', margin: '30px 0' }}>
                    <div style={{ margin: 'auto' }}>
                        <span style={{ marginRight: '5px' }}>Total</span>
                        <span style={{ color: 'red', fontSize: 'x-large', fontWeight: 'bold' }}>
                            {user &&
                                user.carts.length > 0
                                ? user.carts.reduce((sum, { product: { price }, quantity }) =>
                                    sum + (quantity * price), 0
                                )
                                : 0
                            }
                        </span>
                        <span style={{ marginLeft: '5px' }}>THB</span>
                    </div>
                </div>
            </>

        </div >
    )
}

export default Carts
