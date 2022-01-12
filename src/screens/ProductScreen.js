import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"

// importing components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from "../components/Rating"

// importing functions
import {detailsProduct} from "../actions/productActions"

const ProductScreen = props => {
    // hook calls
    const productId=props.match.params.id
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])
    const [qty, setQty] = useState(1)

    // functions declaration
    const handleQtyChange= e => {
        const {value} = e.target
        setQty(value)
    }

    const addToCartHandler= () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    // Variable declarations
    const {loading, error, product} = productList
    const {
        name,
        // category,
        image,
        price,
        countInStock,
        // brand,
        rating,
        numReviews,
        description,
    } = product

    const qtyOptionArray = []
        let i=0
        while (i < countInStock) {
            qtyOptionArray.push(i)
            i= i+1
        }
    const qtyOptionComponents = qtyOptionArray.map(x => (
        <option key={x} value={x+1} > {x+1} </option>
    ))
    const displayDiv= (
        <div>
            <Link to="/"> Back to Result </Link>
            <div className="row top">
                <div className="col-2">
                    <img  src={image} alt={name} />
                </div>
                <div className="col-1">
                    <ul>
                        <li> <h1> {name} </h1> </li>
                        <li> <Rating rating={rating} numReviews={numReviews} /> </li>
                        <li> Price: ${price} </li>
                        <li> Description <p> {description} </p> </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="cart cart-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price"> {price} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {
                                            countInStock > 0 ?(
                                                <span className="success"> {countInStock} </span>
                                            ): (
                                                <span className="danger">Unavailable</span>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            {
                                countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className="row">
                                                <div> Qty </div>
                                                <div>
                                                    <select
                                                        onChange={handleQtyChange}
                                                        value={qty}
                                                    > {qtyOptionComponents} </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick={addToCartHandler} className="primary block"> Add to Chart </button>
                                        </li>
                                    </>
                                )
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
            {
                loading ? <LoadingBox />:
                error ? <MessageBox variant="danger" > {error} </MessageBox>:
                displayDiv
            }
        </div>
    )
}

export default ProductScreen
