import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"

// importing components
import MessageBox from "../components/MessageBox"
import LoadingBox from '../components/LoadingBox'

// functions
import { register } from '../actions/userAction'

const RegisterScreen = props => {
    // Hooks call
    const userInfo = useSelector(state => state.userInfo)
    const {error, user, loading}= userInfo
    const dispatch = useDispatch()
    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const [form, setForm] = useState(initialState)
    const redirect=props.location.search ? `/${props.location.search.split("=")[1]}`: "/"

    
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
        if(form.password === form.confirmPassword){
            return dispatch(register(form))
        }
        alert("Password do not match") 
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                <div>
                    {error && <MessageBox variant="danger">{error}</MessageBox>}            
                    {loading && <LoadingBox variant="danger">{error}</LoadingBox>}            
                </div>
                <div>
                    <label htmlFor="text">Name</label>
                    <input 
                        id="text"
                        type="text"
                        placeholder="Enter name"
                        onChange={handleChange}
                        value={form.name}
                        name="name"
                    />
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={form.confirmPassword}
                        name="confirmPassword"
                    />
                </div>
                <div>
                    <button type="submit" className="primary block">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? {" "}
                        <Link to={`/signIn?redirect=${redirect}`}>Sign in</Link>
                    </div>
                </div>
            </form>   
        </div>
    )
}

export default RegisterScreen
