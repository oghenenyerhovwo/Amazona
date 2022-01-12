import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"

// importing components
import MessageBox from "../components/MessageBox"
import LoadingBox from '../components/LoadingBox'

// functions
import { signIn } from '../actions/userAction'

const SignInScreen = props => {
    // Hooks call
    const userInfo = useSelector(state => state.userInfo)
    const {error, user, loading}= userInfo
    const dispatch = useDispatch()
    const initialState = {
        email: "",
        password: "",
    }
    const [form, setForm] = useState(initialState)
    const previousUrl=props.location.search && props.location.search.split("=")[1]
    const redirect=props.location.search ? `/${previousUrl}`: "/"
    console.log(props)
    useEffect(() => {
        if(user.token){
            props.history.push(redirect)
        }
        console.log(user.token) // eslint-disable-next-line
    }, [user.token,])

    // variables

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
        dispatch(signIn(form))
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    {error && <MessageBox variant="danger">{error}</MessageBox>}            
                    {loading && <LoadingBox variant="danger">{error}</LoadingBox>}            
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={form.email}
                        name="email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={form.password}
                        name="password"
                    />
                </div>
                <div>
                    <button type="submit" className="primary block">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? {" "}
                        <Link to={`/register?redirect=${previousUrl}`}>Create your account</Link>
                    </div>
                </div>
            </form>   
        </div>
    )
}

export default SignInScreen
