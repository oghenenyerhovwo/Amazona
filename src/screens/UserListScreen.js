import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Importing components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// importing functions
import { listUser, deleteUser } from '../actions/userAction'

// action types
import { USER_DELETE_RESET } from '../constants/userConstants'

const UserListScreen = props => {
    const {
        loadingUserList,
        errorUserList,
        userList,
        loadingDelete,
        errorDelete,
        successDelete,
    } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        if(successDelete){
            dispatch({type: USER_DELETE_RESET})
        }
        dispatch(listUser())
    }, [dispatch, successDelete])

    return (
        <div>
            <h1>User List</h1>
            {loadingDelete && <LoadingBox /> }
            {errorDelete && <MessageBox variant="danger">{errorDelete} </MessageBox>}
            {
                loadingUserList ? <LoadingBox /> :
                errorUserList ? <MessageBox variant="danger">{errorUserList} </MessageBox>:
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>IS SELLER</th>
                            <th>IS ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(user => {
                            const editHandler=() => {
                                props.history.push(`/user/${user._id}/edit`)
                            }
                            const deleteHandler= () => {
                                dispatch(deleteUser(user._id))
                            }

                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isSeller? "YES" : "NO"}</td>
                                    <td>{user.isAdmin? "YES" : "NO"}</td>
                                    <td>
                                        <button 
                                            type="button"
                                            className="small"
                                            onClick={editHandler}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            type="button"
                                            className="small"
                                            onClick={deleteHandler}
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

export default UserListScreen