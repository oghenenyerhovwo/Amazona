// importing modules, hooks
import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"

//  importing components
import MessageBox from "../components/MessageBox"

const CartScreen = props => {
    // props
    const productId= props.match.params.id
    const qty= props.location.search ?
            Number(props.location.search.split("=")[1]) :1

    //  Hook calls
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const dispatch = useDispatch()
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    // other variables/functions declared
    const subTotal= cartItems.reduce((a,c) => a+Number(c.qty),0)
    const totalPrice= cartItems.reduce((a,c) => a+(c.qty * c.price),0)

    const checkOutHandler = e => {
        props.history.push(`/signIn/?redirect=shipping`)
    }

    // components
    const checkOutButton= (
        <button
            type="button"
            onClick={checkOutHandler}
            className="primary block"
            disabled={cartItems.length === 0}
        >
            Proceed to check out
        </button>
    )

    const cartComponent=cartItems.length > 0 && cartItems.map((item) => {
        const handleChange = e => {
            dispatch(addToCart(item.product, e.target.value))
        }

        const deleteFromCartHandler = () => {
            dispatch(removeFromCart(item.product))
        }

        const qtyOptionArray = []
        let i=0
        while (i < item.countInStock) {
            qtyOptionArray.push(i)
            i= i+1
        }

        const qtyOptionComponents = qtyOptionArray.map(x => (
            <option key={x} value={x+1} > {x+1} </option>
        ))
        
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
                    <select
                        value={item.qty}
                        onChange={handleChange}
                    >
                        {qtyOptionComponents}
                    </select>
                </div>
                <div>
                    {item.price}
                </div>
                <div>
                    <button
                        type="button"
                        onClick={deleteFromCartHandler}
                    >Delete</button>
                </div>
            </div>
        </li>
        )

    })
    const displayComponent=  cartItems.length === 0 ? (
        <MessageBox>
            Cart is empty, <Link to="/">Go Shopping</Link>
        </MessageBox>
    ): (
        <ul style={{background: "#fff"}}>
            {cartComponent}
        </ul>
    )

    return (
        <div style={{margin: "20px", borderRadius: "3px", boxShadow: "4px 4px 2px blur black" }} className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {displayComponent}
            </div>
            <div className="col-1">
                <div className="cart cart-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal: ({subTotal} items): ${totalPrice}
                            </h2>
                        </li>
                        <li>
                            {checkOutButton}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
