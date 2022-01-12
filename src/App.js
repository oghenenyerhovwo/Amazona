// importing modules and hooks
import React from 'react'
import {BrowserRouter, Route,} from "react-router-dom"

// importing components
import Header from './components/Header'
import ProductScreen from "./screens/ProductScreen"
import HomeScreen from "./screens/HomeScreen"
import CartScreen from './screens/CartScreen'
import SignInScreen from './screens/SignInScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import { OrderHistoryScreen } from './screens/OrderHistoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import AddProductScreen from './screens/AddProductScreen'


// importing redirecting components
import PrivateRoute from './components/RedirectRoutes/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import SellerRoute from './components/SellerRoute'

const App = () => {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
            <Route path="/products/:id" component={ProductScreen} exact></Route>
            <Route path="/cart/:id?" component={CartScreen} ></Route>
            <Route path="/signIn" component={SignInScreen} ></Route>
            <Route path="/register" component={RegisterScreen} ></Route>
            <PrivateRoute path="/shipping" component={ShippingAddressScreen} ></PrivateRoute>
            <Route path="/payment" component={PaymentMethodScreen} ></Route>
            <Route path="/placeOrder" component={PlaceOrderScreen} ></Route>
            <Route path="/order/:id" component={OrderScreen} ></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen} ></Route>
            <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
            <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
            <AdminRoute path="/product/:id/edit" component={ProductEditScreen} ></AdminRoute>
            <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
            <AdminRoute path="/userlist" component={UserListScreen} ></AdminRoute>
            <AdminRoute path="/user/:id/edit" component={UserEditScreen} ></AdminRoute>
            <SellerRoute path="/addproduct/seller" component={AddProductScreen} exact></SellerRoute>
            <SellerRoute path="/orderlist/seller" component={OrderListScreen} exact></SellerRoute>
            <SellerRoute path="/productlist/seller" component={ProductListScreen} exact></SellerRoute>
            <Route path="/" component={HomeScreen} exact></Route>
            
        </main>
        <footer className="row center">
            All rights reserved
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
