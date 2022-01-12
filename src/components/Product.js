// importing node modules/hooks
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

// importing components
import Rating from "./Rating"
import LoadingBox from "./LoadingBox"
import MessageBox from "./MessageBox"

// importing functions
import {listProducts} from "../actions/productActions"

const Product = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products, loading, error} = productList
    
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productComponents=products.map(({
        _id,
        name,
        category,
        image,
        price,
        countInStock,
        brand,
        rating,
        numReviews,
        description,
    }) => (
        <div key={_id} className="cart">
            <Link to={`/products/${_id}`}>
                <img className="medium" src={image} alt={name} />
            </Link>
            <div className="cart-body">
                <Link to={`/products/${_id}`}>
                    <h2> {name}  </h2>
                </Link>
                <Rating rating={rating} numReviews={numReviews} />
                <div className="price">
                    {price}
                </div>
            </div>
        </div>
  ))
    return (
        <React.Fragment>
            {
                loading ? <LoadingBox />:
                error ? <MessageBox variant="danger" > {error} </MessageBox>:
                productComponents
            }
        </React.Fragment>
    )
}

export default Product
