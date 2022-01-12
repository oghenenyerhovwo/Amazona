import axios from "../../node_modules/axios/index";
import { 
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => (dispatch, getState) => {
  axios
    .get("/api/products/" + productId)
    .then(({data}) =>{
        dispatch({
          type: CART_ADD_ITEM,
          payload: {
              name: data.name,
              price: data.price,
              image: data.image,
              countInStock: data.countInStock,
              product: data._id,
              seller: data.seller,
              qty,
          }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    }
  );
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
};

export const saveShippingAddress = (form) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: form,
  })
  localStorage.setItem("shippingAddress", JSON.stringify(form))
  // axios
  //   .get("/api/products/" + productId)
  //   .then(({data}) =>{
  //       dispatch({
  //         type: CART_SAVE_SHIPPING_ADDRESS,
  //         payload: {
  //             name: data.name,
  //             price: data.price,
  //             image: data.image,
  //             countInStock: data.countInStock,
  //             product: data._id,
  //             qty,
  //         }
  //       })
  //       localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
  //   }
  // );
};

export const savePaymentMethod = (form) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: form,
  })
};