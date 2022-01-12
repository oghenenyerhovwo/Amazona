import React, { useState } from 'react'
import CheckOutSteps from '../components/CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'

// importing functions
import { savePaymentMethod } from '../actions/cartActions'

const PaymentMethodScreen = props => {
    // hook call
    const {shippingAddress} = useSelector(state => state.cart)
    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const dispatch = useDispatch()

    // variables/conditionals
    if(!shippingAddress.address){
        props.history.push("/shipping")
    }

    // functions
    const handleChange= e => {
        setPaymentMethod(e.target.value)
    }

    const submitHandler= e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push("placeOrder")
    }

    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="PayPal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={handleChange}
                        />
                        <label htmlFor="PayPal">PayPal</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="stripe"
                            value="stripe"
                            name="paymentMethod"
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <label />
                    <button
                        className="primary"
                        type="submit"
                    >Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethodScreen
