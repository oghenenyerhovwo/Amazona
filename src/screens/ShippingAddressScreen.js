import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'

// importing components
import CheckOutSteps from '../components/CheckOutSteps'

// importing functions
import { saveShippingAddress } from '../actions/cartActions'

const ShippingAddressScreen = props => {
    // hooks
    const {shippingAddress} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const initialState = {
        fullName: shippingAddress.fullName ,
        address: shippingAddress.address ,
        city: shippingAddress.city ,
        postalCode: shippingAddress.postalCode ,
        country: shippingAddress.country ,
    }
    const [form, setForm] = useState(initialState)

    // functions
    const handleChange= e => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const submitHandler= e => {
        e.preventDefault()
        dispatch(saveShippingAddress(form))
        props.history.push("/payment")
    }

    return (
        <div>
            <CheckOutSteps step1 step2></CheckOutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    {/* {error && <MessageBox variant="danger">{error}</MessageBox>}             */}
                    {/* {loading && <LoadingBox variant="danger">{error}</LoadingBox>}             */}
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                        id="fullName"
                        type="text"
                        placeholder="Enter full name"
                        onChange={handleChange}
                        value={form.fullName}
                        name="fullName"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input 
                        id="address"
                        type="text"
                        placeholder="Enter address"
                        onChange={handleChange}
                        value={form.address}
                        name="address"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input 
                        id="city"
                        type="text"
                        placeholder="Enter city"
                        onChange={handleChange}
                        value={form.city}
                        name="city"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input 
                        id="postalCode"
                        type="text"
                        placeholder="Enter Postal Code"
                        onChange={handleChange}
                        value={form.postalCode}
                        name="postalCode"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input 
                        id="country"
                        type="text"
                        placeholder="Enter country"
                        onChange={handleChange}
                        value={form.country}
                        name="country"
                        required
                    />
                </div>
                <div>
                    <label />
                    <button type="submit" className="primary block">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddressScreen
