import React from 'react';
import Script from 'react-load-script'

let OmiseCard

const CheckOut = () => {

    // loading script
    const handleLoadScript = () => {
        // console.log(window.OmiseCard);
        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            publicKey: process.env.OMISE_PUBLIC_KEY,
            currency: 'thb',
            frameLabel: 'Next Shop',
            submitLabel: 'PAY NOW',
            buttonLabel: 'Pay with Omise',
            image: 'https://res.cloudinary.com/the-rabbit-team/image/upload/v1642661409/graphql-basic/l8tzbyqyeqa3xvoqftfo.jpg'
        })
    }

    // setting omise configuratios
    const creditCardConfigure = () => {

        // config form
        OmiseCard.configure({
            defaultPaymentMethod: "credit_card",
            otherPaymentMethods: ['bill_payment_tesco_lotus', 'rabbit_linepay', 'truemoney', 'internet_banking']
        })

        // config button
        OmiseCard.configureButton('#credit-card')

        // attach set configurations 
        OmiseCard.attach()

        // Open the payment form.
        OmiseCard.open({
            frameDescription: 'Invoice #1234',
            amount: 100000,
            onCreateTokenSuccess: (token) => {

                // accept omise token
                console.log(token);
            },
            onFormClosed: () => {
                /* Handler on form closure. */
            },
        })
    }

    // accept omise token
    const omiseHandler = () => {

    }

    // loading omise configurations, open form
    const handleOnClick = (e) => {
        e.preventDefault()
        creditCardConfigure()
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <Script
                url='https://cdn.omise.co/omise.js'
                onLoad={handleLoadScript}
            />

            <form>

                <button
                    id='credit-card'
                    type='button'
                    style={{ marginTop: '20px', padding: '5px 10px', cursor: 'pointer', border: 'none', fontSize: '18px' }}
                    onClick={handleOnClick}
                >
                    Pay with Credit card
                </button>
            </form>

        </div>
    )
};

export default CheckOut;
