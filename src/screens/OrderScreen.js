import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import axios from '../../node_modules/axios/index'
import {PayPalButton} from "react-paypal-button-v2"

// importing components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// functions
import { detailOrder, payOrder, deliverOrder } from '../actions/orderActions'

// importing constants
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = props => {
    // hooks call
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const {
            orderDetail, 
            loading, 
            loading2, 
            error, 
            success,
            loadingDeliver,
            errorDeliver,
            successDeliver,
    } = useSelector(state => state.order)
    const {user} = useSelector(state => state.userInfo)
    
    const orderId = props.match.params.id
    useEffect(() => {
        const addPayPalScript= async () => {
            const {data} = await axios.get("/api/config/paypal")
            const script= document.createElement("script")
            script.type="text/javascript"
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
            script.async= true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!orderDetail.paymentMethod || success || successDeliver || (orderDetail._id !== orderId)){
            dispatch(detailOrder(orderId))
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
        } else { 
            if(!orderDetail.isPaid){
                if(!window.paypal){
                    addPayPalScript()
                } else {
                    setSdkReady(true)
                }
            }
        }
    }, [dispatch,orderDetail,orderId, success, successDeliver ])

    // functions 
    const successPaymentHandler= createPaymentResult => {
        const paymentResult={
            ...createPaymentResult,
            email_address: createPaymentResult.payer.email_address
        }
        const updatedResult={
            ...orderDetail,
            paymentResult,
        }
        dispatch(payOrder(updatedResult))
    }   

    const deliverPaymentHandler = () => {
        dispatch(deliverOrder(orderId))
    }

    // declaring components

    return loading2 ? <LoadingBox/>:
        error ? <MessageBox> {error} </MessageBox>:(
        <div>
            <h1>Order: {orderDetail._id} </h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="cart cart-body">
                                <h2>Shipping</h2>
                                <div>
                                    <strong>Name:</strong> {orderDetail.shippingAddress.fullName}
                                    <p><strong>Address:</strong> {orderDetail.shippingAddress.address}{' '},
                                    {orderDetail.shippingAddress.city}, {orderDetail.shippingAddress.postalCode}
                                    ,{orderDetail.shippingAddress.country}</p>
                                </div>
                                {orderDetail.isDelivered? 
                                    <MessageBox variant="success">Delivered at {orderDetail.deliveredAt} </MessageBox>:
                                    <MessageBox variant="danger">Not delivered </MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="cart cart-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {orderDetail.paymentMethod}
                                </p>
                                {orderDetail.isPaid? 
                                    <MessageBox variant="success">Paid at at {orderDetail.paidAt} </MessageBox>:
                                    <MessageBox variant="danger">Not Paid </MessageBox>
                                },
                            </div>
                        </li>
                        <li>
                            <div className="cart cart-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {orderDetail.orderItems && orderDetail.orderItems.length > 0 && orderDetail.orderItems.map((item) => {
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

                                    })}
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
                                    <div>${orderDetail.itemsPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${orderDetail.shippingPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${orderDetail.taxPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order total</strong></div>
                                    <div><strong>${orderDetail.totalPrice.toFixed(2)}</strong> </div>
                                </div>
                            </li>
                            {
                                !orderDetail.isPaid  && (
                                    <li>
                                        {
                                            !sdkReady ? (
                                                <LoadingBox />
                                            ):
                                            <React.Fragment>
                                                {error && <MessageBox variant="danger">{error} </MessageBox>}
                                                {loading && <LoadingBox/> }
                                                <PayPalButton 
                                                    amount={orderDetail.totalPrice} 
                                                    onSuccess={successPaymentHandler}>
                                                </PayPalButton>
                                            </React.Fragment>
                                        }
                                    </li>
                                )
                            }

                            {
                                user.isAdmin && orderDetail.isPaid && !orderDetail.isDelivered  && (
                                    <li>
                                        <React.Fragment>
                                            {errorDeliver && <MessageBox variant="danger">{error} </MessageBox>}
                                            {loadingDeliver && <LoadingBox/> }
                                            <button 
                                                type="button" 
                                                className="primary"
                                                onClick={deliverPaymentHandler}
                                            >Deliver Order
                                            </button>
                                        </React.Fragment>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderScreen
