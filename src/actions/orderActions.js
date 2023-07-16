// importing node modules
import axios from "axios";

// importing constants
import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

export const createOrder = order => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order,
    })
    axios
        .post(
            "https://amazona-zlv1.onrender.com/api/orders", 
            order, 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: res.data
            })
            dispatch({type: CART_EMPTY})
            localStorage.removeItem("cartItems")
        })
        .catch(err => {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const detailOrder = orderId => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: ORDER_DETAILS_REQUEST,
        payload: orderId,
    })
    axios
        .get(
            "https://amazona-zlv1.onrender.com/api/orders/" + orderId, 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const payOrder = updatedOrder => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: ORDER_PAY_REQUEST,
        payload: updatedOrder,
    })
    axios
        .put(
            `https://amazona-zlv1.onrender.com/api/orders/${updatedOrder._id}/pay`, 
            updatedOrder, 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const listOrderMine = () => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: ORDER_MINE_LIST_REQUEST,
    })
    axios
        .get(
            "https://amazona-zlv1.onrender.com/api/orders/mine", 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: ORDER_MINE_LIST_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ORDER_MINE_LIST_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const listOrder = (seller = "") => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: ORDER_LIST_REQUEST,
    })
    axios
        .get(
            `https://amazona-zlv1.onrender.com/api/orders?seller=${seller}`, 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ORDER_LIST_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const deleteOrder = orderId => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: ORDER_DELETE_REQUEST,
    })
    axios
        .delete(
            "https://amazona-zlv1.onrender.com/api/orders/" + orderId, 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: ORDER_DELETE_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ORDER_DELETE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const deliverOrder = orderId => (dispatch, getState) => {
    const user= getState().userInfo.user
    
    dispatch({
        type: ORDER_DELIVER_REQUEST,
        payload: orderId,
    })
    axios
        .put(
            `https://amazona-zlv1.onrender.com/api/orders/${orderId}/deliver`, 
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ORDER_DELIVER_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};
