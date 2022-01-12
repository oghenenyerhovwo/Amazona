import axios from "../../node_modules/axios/index";
import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL,
    USER_SIGNOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL, 
} from "../constants/userConstants";

export const signIn = (form) => dispatch => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
    })
    axios
        .post("/api/users/signIn", form)
        .then(res =>{
            dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: res.data
            })
            localStorage.setItem("userInfo", JSON.stringify(res.data))
        })
        .catch(err => {
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const signOut = () => dispatch => {
    dispatch({
        type: USER_SIGNOUT,
    })
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    document.location.href = "/signIn"
};

export const register = (form) => dispatch => {
    dispatch({
        type: USER_REGISTER_REQUEST,
    })
    axios
        .post("/api/users/register", form)
        .then(res =>{
            dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data
            })
            localStorage.setItem("userInfo", JSON.stringify(res.data))
        })
        .catch(err => {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const detailsUser = userId => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: USER_DETAILS_REQUEST,
        payload: userId,
    })
    axios
        .get(
            "/api/users/" + userId,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const updateUserProfile = (userId, form) => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
        payload: {userId, ...form},
    })
    axios
        .put(
            "/api/users/profile",
            form,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: res.data
            })
            localStorage.setItem("userInfo", JSON.stringify(res.data))
        })
        .catch(err => {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const listUser = () => (dispatch, getState) => {
    const user= getState().userInfo.user

    dispatch({
        type: USER_LIST_REQUEST,
    })
    axios
        .get(
            "/api/users/",
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: USER_LIST_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: USER_LIST_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const deleteUser = userId => (dispatch, getState) => {
    const user= getState().userInfo.user

    dispatch({
        type: USER_DELETE_REQUEST,
    })
    axios
        .delete(
            "/api/users/" + userId,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: USER_DELETE_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: USER_DELETE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const updateUser = (userId, editedUser, ) => (dispatch, getState) => {
    const user= getState().userInfo.user

    dispatch({
        type: USER_UPDATE_REQUEST,
    })
    axios
        .put(
            "/api/users/" + userId,
            editedUser,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};