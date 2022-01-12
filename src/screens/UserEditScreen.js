import React, { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'

// importing functions
import { detailsUser, updateUser,  } from '../actions/userAction'

// importing components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// types
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = props => {
    // hooks
    const { 
        userDetail, 
        loading, 
        error, 
        loadingUpdate,
        errorUpdate,
        successUpdate,
    } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const initialState = {
        name: "",
        email: "" ,
        isSeller: false,
        isAdmin: false,
    }
    const [form, setForm] = useState(initialState)
    const userId= props.match.params.id 

    useEffect(() => {
        if(successUpdate){
            props.history.push("/userlist")
            dispatch({type: USER_UPDATE_RESET})
        }
        if(!userDetail._id || userDetail._id !== userId){
            dispatch(detailsUser(userId))
        }
        else {
            const {name, email, isAdmin, isSeller} = userDetail
            setForm({name, email, isAdmin, isSeller})
        }
        
    }, [dispatch, userId, props.history, successUpdate, userDetail])

    // functions
    const handleChange= e => {
        const {name, value, type, checked} = e.target
        if (type === "checkbox"){
            setForm({ ...form,[name]: checked}) 
        } else {setForm({ ...form,[name]: value}) }
        
    }

    const submitHandler= e => {
        e.preventDefault()
        dispatch(updateUser(userId, {...form, _id: userDetail._id}))
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                    {errorUpdate && <MessageBox variant="danger" >{errorUpdate}</MessageBox>}
                    {loadingUpdate && <LoadingBox />}
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
                            <label htmlFor="isSeller">is Seller</label>
                            <input 
                                id="isSeller"
                                type="checkbox"
                                onChange={handleChange}
                                checked={form.isSeller}
                                name="isSeller"
                            />
                        </div>
                        <div>
                            <label htmlFor="isAdmin">isAdmin</label>
                            <input 
                                id="isAdmin"
                                type="checkbox"
                                onChange={handleChange}
                                checked={form.isAdmin}
                                name="isAdmin"
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

export default UserEditScreen
