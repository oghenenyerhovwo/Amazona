import React, { useState, useEffect } from 'react'

// components
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { useSelector, useDispatch } from 'react-redux'

// importing functions
import { detailsProduct, updateProduct } from '../actions/productActions'
import { uploadImage, } from '../actions/uploadActions'

// importing action types
import { UPLOAD_IMAGE_RESET, } from '../constants/uploadConstants'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = props => {
    //eslint-disable-next-line
    const initialState={
        name: "",
        image: "",
        brand: "",
        category: "",
        description: "",
        price: 0,
        countInStock: 0,
    }
    const [form, setForm] = useState(initialState)
    const {
        loadingUpload,
        successUpload,
        uploadUrl,
        errorUpload,
    } = useSelector(state => state.uploads)
    const {loading, error, product, loadingCreate, errorCreate, successCreate} = useSelector(state => state.productList)
    const dispatch = useDispatch()
    const productId= props.match.params.id

    useEffect(() => {
        if(successUpload){
            setForm({
                ...form,
                "image": uploadUrl
            })
            dispatch({type: UPLOAD_IMAGE_RESET,})
        }
        if (successCreate){
            props.history.push("/productlist")
            dispatch({type: PRODUCT_UPDATE_RESET})
        }
        else if(!product._id || productId !== product._id){
            dispatch(detailsProduct(productId))
        } else{
            const {name,image, brand, category, description, price, countInStock}= product
            setForm({name, brand,image, category, description, price, countInStock})
        }// eslint-disable-next-line
    }, [dispatch, successUpload, productId, product, props.history, successCreate])

    // functions
    const handleChange=e => {
        const {name, value}= e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const submitHandler= e => {
        e.preventDefault()
        dispatch(updateProduct(productId, form))
    }

    const handleImage= e => {
        if(e.target.files){
            dispatch(uploadImage(e.target.files[0]))
        }  
    }
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product</h1>
                    {loadingCreate && <LoadingBox variant="danger">{error}</LoadingBox>}
                    {errorCreate && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                {
                        loading ? <LoadingBox variant="danger">{error}</LoadingBox>:
                        error ? <MessageBox variant="danger">{error}</MessageBox>:
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input 
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={handleChange}
                                    value={form.name}
                                    name="name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input 
                                    id="price"
                                    type="number"
                                    placeholder="Enter price"
                                    onChange={handleChange}
                                    value={form.price}
                                    name="price"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Image</label>
                                <input 
                                    type="file"
                                    onChange={handleImage}
                                />
                                {loadingUpload && <LoadingBox/>}
                                {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>} 
                                {form.image && <img className="small" src={form.image} alt={form.name} /> }
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <input 
                                    id="category"
                                    type="text"
                                    placeholder="Enter Category"
                                    onChange={handleChange}
                                    value={form.category}
                                    name="category"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input 
                                    id="countInStock"
                                    type="number"
                                    placeholder="Enter Count In Stock"
                                    onChange={handleChange}
                                    value={form.countInStock}
                                    name="countInStock"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="brand">Brand</label>
                                <input 
                                    id="brand"
                                    type="text"
                                    placeholder="Enter brand"
                                    onChange={handleChange}
                                    value={form.brand}
                                    name="brand"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input 
                                    id="description"
                                    type="text"
                                    placeholder="Enter description"
                                    onChange={handleChange}
                                    value={form.description}
                                    name="description"
                                    required
                                />
                            </div>
                            <div>
                                <label />
                                <button type="submit" className="primary block">Update</button>
                            </div>
                        </>
                    } 
            </form>
        </div>
    )
}

export default ProductEditScreen