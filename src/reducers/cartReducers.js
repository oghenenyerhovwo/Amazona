import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM, 
  CART_SAVE_SHIPPING_ADDRESS, 
  CART_SAVE_PAYMENT_METHOD, 
  CART_EMPTY,
} from "../constants/cartConstants";
  
  const initialState={
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
      paymentMethod: "",
  }
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload
        const existItem= state.cartItems.find(cartItem => cartItem.product === item.product)

        if(existItem){
            return {
                ...state,
                cartItems: state.cartItems.map(cartItem => cartItem.product === existItem.product ? item:cartItem)
            }; 
        } else{
            return {
                ...state,
                cartItems: [...state.cartItems, item]
            }
        }

      case CART_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product !== action.payload)
        }
      
      case CART_SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: action.payload
        }

      case CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload
        }
      
      case CART_EMPTY:
        return {
          ...state,
          cartItems: [],  
        }
       
      default:
        return state;
    }
  }