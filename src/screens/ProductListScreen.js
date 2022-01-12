import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// importing components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// importing functions
import { listProducts,  deleteProduct } from '../actions/productActions'
import {  PRODUCT_DELETE_RESET } from '../constants/productConstants'


const ProductListScreen = props => {
    // hook calls
    const {
            products, 
            loading, 
            error, 
            loadingDelete,
            errorDelete,
            successDelete,
    } = useSelector(state => state.productList)
    const dispatch = useDispatch()

    useEffect(() => {
        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET,})
        }
        dispatch(listProducts())
    }, [dispatch,  successDelete])


    return (
        <div>
            <div>
                <h1>Products</h1>
            </div>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete} </MessageBox>}
            {
                loading ? <LoadingBox /> :
                error ? <MessageBox variant="danger">{error} </MessageBox>:
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            
                            const handleEdit = () =>{
                                props.history.push(`/product/${product._id}/edit`)
                            }

                            const handleDelete = () =>{
                                dispatch(deleteProduct(product._id))
                            }

                            return (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button 
                                            type="button"
                                            className="small"
                                            onClick={handleEdit}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            type="button"
                                            className="small"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default ProductListScreen
