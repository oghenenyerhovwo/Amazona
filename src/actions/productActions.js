// importing node modules
import axios from "axios";

  // "proxy": "https://my-amazona-backend.herokuapp.com",
// importing constants
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

} from "../constants/productConstants"

export const listProducts = (seller = "") => dispatch => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    })
    axios
        .get(
            `https://amazona-zlv1.onrender.com/api/products?seller=${seller}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }
            }
        )
        .then(res =>{
            dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const detailsProduct = productId => dispatch => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId,
    })
    axios
        .get("https://amazona-zlv1.onrender.com/api/products/" + productId)
        .then(res =>{
            dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const createProduct = (form) => (dispatch,getState ) => {
    const user= getState().userInfo.user
    dispatch({
        type: PRODUCT_CREATE_REQUEST,
        payload:form,
    })
    axios
        .post(
            "https://amazona-zlv1.onrender.com/api/products",
            form,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
        )
        .then(res =>{
            dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const updateProduct = (productId, form) => (dispatch,getState ) => {
    const user= getState().userInfo.user

    dispatch({
        type: PRODUCT_UPDATE_REQUEST,
    })
    axios
        .put(
            "https://amazona-zlv1.onrender.com/api/products/" + productId,
            form,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_UPDATE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};

export const deleteProduct = (productId) => (dispatch,getState ) => {
    const user= getState().userInfo.user

    dispatch({
        type: PRODUCT_DELETE_REQUEST,
    })
    axios
        .delete(
            "https://amazona-zlv1.onrender.com/api/products/" + productId,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res =>{
            dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_DELETE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};
