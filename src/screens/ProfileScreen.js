import React, { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'

// importing functions
import { detailsUser, updateUserProfile } from '../actions/userAction'

// importing components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// importing constants
import { USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = () => {
    // hooks
    const { userDetail, user,loading, error, updateMessage, updateLoading, updateSuccess} = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const initialState = {
        name: user.name ,
        email: user.email ,
        password: "",
        confirmPassword: "",
    }
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        if(updateSuccess){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
        }
        dispatch(detailsUser(user._id))
    }, [dispatch, user._id, updateSuccess])

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
        if(form.password !== form.confirmPassword){
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: "Password do not match"
            })
        } else {
            dispatch(updateUserProfile(userDetail._id, form))
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                    {updateMessage && 
                        <MessageBox 
                            variant={updateMessage === "Profile has been updated successfully"? "success": "danger" }
                        >{updateMessage} 
                        </MessageBox>}
                    {updateLoading && <LoadingBox />}
                </div>
                {
                    loading? <LoadingBox />:
                    error? <MessageBox variant="danger">{error} </MessageBox>:
                    <>
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input 
                                id="name"
                                type="text"
                                placeholder="Enter full name"
                                onChange={handleChange}
                                value={form.name}
                                name="name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                value={form.email}
                                name="email"
                                required
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
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter confirm password"
                                onChange={handleChange}
                                value={form.confirmPassword}
                                name="confirmPassword"
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

export default ProfileScreen
