import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// importing components
import MessageBox from "../components/MessageBox"
import LoadingBox from '../components/LoadingBox'

// importing functions
import { createProduct, } from '../actions/productActions'
import { uploadImage, } from '../actions/uploadActions'
import { PRODUCT_CREATE_RESET, } from '../constants/productConstants'
import { UPLOAD_IMAGE_RESET, } from '../constants/uploadConstants'

const SignInScreen = props => {
    // Hooks call
    const userInfo = useSelector(state => state.userInfo)
    const {
        product,
        errorCreate,
        loadingCreate,
        successCreate,
    } = useSelector(state => state.productList)
    const {
        loadingUpload,
        successUpload,
        uploadUrl,
        errorUpload,
    } = useSelector(state => state.uploads)

    const dispatch = useDispatch()
    const initialState = {
        seller: userInfo.user.name,
        name: "",
        image: "",
        brand: "",
        category: "",
        description: "",
        price: "0",
        countInStock: "0",
        rating: 0,
        numReviews: 0,
    }
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        if(successCreate){
            props.history.push(`/products/${product._id}`)
            dispatch({type: PRODUCT_CREATE_RESET,})
        }
        if(successUpload){
            setForm({
                ...form,
                "image": uploadUrl
            })
            dispatch({type: UPLOAD_IMAGE_RESET,})
        }
        // eslint-disable-next-line
    }, [dispatch,successUpload, successCreate,props.history])

    // variables

    // functions
    const handleChange= e => {
        const {name, value} = e.target

            setForm({
            ...form,
            [name]: value
            })
        
    }
    const handleImage= e => {
        if(e.target.files){
            dispatch(uploadImage(e.target.files[0]))
        }  
    }
    const submitHandler= e => {
        e.preventDefault()
        dispatch(createProduct(form))
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Add Product</h1>
                </div>
                <div>
                    {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}            
                    {loadingCreate && <LoadingBox/>}            
                </div>
                <div>
                    <label htmlFor="seller">Seller</label>
                    <input 
                        id="seller"
                        type="text"
                        value={form.seller}
                        placeholder="Enter seller"
                        required
                        disabled={true}
                    />
                </div>
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="Enter Product Name"
                        required
                        onChange={handleChange}
                        value={form.email}
                        name="name"
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
                    <label htmlFor="brand">Brand</label>
                    <input 
                        id="brand"
                        type="text"
                        placeholder="Enter brand"
                        required
                        onChange={handleChange}
                        value={form.brand}
                        name="brand"
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input 
                        id="category"
                        type="text"
                        placeholder="Enter category"
                        required
                        onChange={handleChange}
                        value={form.category}
                        name="category"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input 
                        id="description"
                        type="text"
                        placeholder="Enter description"
                        required
                        onChange={handleChange}
                        value={form.description}
                        name="description"
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input 
                        id="price"
                        type="number"
                        onChange={handleChange}
                        value={form.price}
                        name="price"
                    />
                </div>
                <div>
                    <label htmlFor="countInStock">Count In Stock</label>
                    <input 
                        id="countInStock"
                        type="number"
                        onChange={handleChange}
                        value={form.countInStock}
                        name="countInStock"
                    />
                </div>
                <div>
                    <button type="submit" className="primary block">Add</button>
                </div>
            </form>   
        </div>
    )
}

export default SignInScreen
