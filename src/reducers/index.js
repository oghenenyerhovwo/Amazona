import { combineReducers } from "redux";
import productReducers from "./productReducers";
import uploadReducers from "./uploadReducers";
import cartReducers from "./cartReducers";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
    productList: productReducers,
    uploads: uploadReducers,
    cart: cartReducers,
    userInfo: userReducer,
    order: orderReducer
});
