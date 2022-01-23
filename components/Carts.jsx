import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import CartItem from './CartItem'
import { AuthContext } from '../appState/AuthProvider'
import CheckOut from './CheckOut'
import { Me } from '../components/Nav'

// create order mutation
const CreateOrder = gql`
    mutation Mutation($amount: Float!, $cardId: String, $token: String, $return_uri: String) {
        createOrder(amount: $amount, cardId: $cardId, token: $token, return_uri: $return_uri) {
            id
            items {
                id
                product {
                    desc
                    price
                }
            quantity
            createdAt
            }
            authorize_uri
        }
    }
    
`

const Carts = () => {

    // get user from Authentication state
    const { user } = useContext(AuthContext)
    console.log(user);

    // call useMutaion
    const [createOrder, { loading, error }] = useMutation(CreateOrder, {
        onCompleted: data => {
            if (data.createOrder.authorize_uri) {
                // go to internet banking page
                window.location.href = data.createOrder.authorize_uri
            }
        },
        refetchQueries: [{ query: Me }]
    })

    // calculate amount
    const calculateAmount = (carts) => {
        const amount = carts.reduce(
            (sum, cart) => sum + cart.quantity * cart.product.price, 0
        )
        return amount * 100
    }

    // handle creditCardCheckout
    const handleCheckout = async (amount, cardId, token, return_uri) => {

        // call createOrder
        const result = await createOrder({ variables: { amount, cardId, token, return_uri } })
        console.log('Result -->', result)
    }

    return (
        user && (
            <div style={{ width: '70%', margin: 'auto' }}>

                {/* // todo: table */}
                {user.carts.length === 0
                    ? <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Your cart is empty.</p>
                    : <>
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
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr', width: '100%', borderBottom: '2px solid gray', margin: '30px 0' }}>
                            <div style={{ margin: 'auto' }}>
                                <span style={{ marginRight: '5px' }}>Total</span>
                                <span style={{ color: 'red', fontSize: 'x-large', fontWeight: 'bold' }}>
                                    {
                                        user.carts.length > 0 &&
                                        user.carts.reduce((sum, { product: { price }, quantity }) =>
                                            sum + (quantity * price), 0
                                        )
                                    }
                                </span>
                                <span style={{ marginLeft: '5px' }}>THB</span>
                            </div>
                        </div>

                        {/* //todo: show previous credit card  */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px'
                            }}
                        >
                            <div>
                                {user &&
                                    user.cards &&
                                    user.cards.map(card => (
                                        <div
                                            key={card.id}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <p>
                                                **** **** {card.cardInfo.last_digits}{' '}
                                                {card.cardInfo.brand} expire:
                                                {card.cardInfo.expiration_month}/
                                                {card.cardInfo.expiration_year}
                                            </p>
                                            <button
                                                style={{
                                                    background: 'blue',
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                    border: 'none'
                                                }}
                                                onClick={() => {
                                                    const amount = calculateAmount(user.carts)
                                                    handleCheckout(amount, card.id)
                                                }}
                                            >
                                                Use This Card
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* //todo: check out with credit card */}
                        <CheckOut amount={calculateAmount(user.carts)} handleCheckout={handleCheckout} />

                    </>
                }

            </div >
        )
    )
}

export default Carts
