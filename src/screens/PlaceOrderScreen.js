import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"

// importing components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import CheckOutSteps from '../components/CheckOutSteps'

// importing functions
import { createOrder } from '../actions/orderActions'

// importing constants
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


const PlaceOrderScreen = props => {
    // hooks call
    const cart = useSelector(state => state.cart)
    const {orderCreate, loading, success, error} = useSelector(state => state.order)
    const {cartItems, shippingAddress, paymentMethod} = cart
    const dispatch = useDispatch()

    useEffect(() => {
        if(success){
            props.history.push(`/order/${orderCreate._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, props.history, dispatch, orderCreate._id])

    // conditionals
    if(!paymentMethod){
        props.history.push("/payment")
    }
    
    // functions
    const toPrice= (num) => {
        return Number(num.toFixed(2))
    }
    const itemsPrice= toPrice(cartItems.reduce((a,c) => a + c.qty *c.price,0))
    const shippingPrice =itemsPrice > 100? toPrice(0): toPrice(10)
    const taxPrice= toPrice(0.15 * itemsPrice)
    const totalPrice= itemsPrice + shippingPrice + taxPrice

    const placeHolderHandler=() => {
        const newOrder={
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            shippingAddress, 
            paymentMethod,
            orderItems: cartItems
        }
        dispatch(createOrder(newOrder))
    }

    // declaring components
    const cartComponent=cartItems.length > 0 && cartItems.map((item) => {
        return (
            <li key={item.product}>
                <div className="row">
                    <div>
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="small">
                        </img>
                    </div>
                    <div className="min-30">
                        <Link to={`/products/${item.product}`}> {item.name} </Link>
                    </div>
                    <div>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                    </div>
                </div>
            </li>
        )

    })

    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="cart cart-body">
                                <h2>Shipping</h2>
                                <div>
                                    <strong>Name:</strong> {shippingAddress.fullName}
                                    <p><strong>Address:</strong> {shippingAddress.address}{' '},
                                    {shippingAddress.city}, {shippingAddress.postalCode}
                                    ,{shippingAddress.country}</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="cart cart-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="cart cart-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {cartComponent}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="cart cart-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${itemsPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${shippingPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${taxPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order total</strong></div>
                                    <div><strong>${totalPrice.toFixed(2)}</strong> </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="submit"
                                    className="primary block"
                                    onClick={placeHolderHandler}
                                    disabled={cartItems.length === 0}
                                >
                                    Place Order
                                </button>
                            </li>
                            {loading && <LoadingBox />}
                            {error && <MessageBox variant="danger"> {error} </MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen
