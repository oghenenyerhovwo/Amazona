// importing modules
import React from 'react'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'
import { faCaretDown} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { useDispatch } from 'react-redux'

// importing functions
import { signOut } from "../actions/userAction"


const Header = props => {
    // state, props and hook calls
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const userInfo = useSelector(state => state.userInfo)
    const {cartItems} = cart
    const {user} = userInfo

    // functions
    const signOutHandler= () => {
        dispatch(signOut())
    }

    // component variables
    const badgeComponent= cartItems.length > 0 && (
        <span className="badge">{cartItems.length}</span>
    )
    
    const toppleLink= user.token ? (
        <div className="dropdown">
            <Link to="#">
                {user.name} <FontAwesomeIcon icon={faCaretDown}/>{" "}
            </Link>
            <ul className="dropdown-content">
                <li>
                    <Link to="/profile">User profile</Link>
                </li>
                <li>
                    <Link to="/orderhistory" >OrderHistory</Link>
                </li>
                <li>
                    <Link to="#signOut" onClick={signOutHandler}>Sign out</Link>
                </li>
            </ul>
        </div>
    ) : <Link to="/signIn">Sign in</Link>

    return (
        <div>
            
            <header className="row nav-header">
              <div>
                  <Link to="/" className="brand" >amazona</Link> 
              </div>
              <div>
                  <Link to="/cart">Cart {badgeComponent}</Link>
                  {toppleLink}
                  {
                      user.token && user.isSeller && (
                        <div className="dropdown">
                            <Link to="#admin">
                                Seller <FontAwesomeIcon icon={faCaretDown}/>{" "}
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/productlist/seller" >Products</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist/seller" >Orders</Link>
                                </li>
                                <li>
                                    <Link to="/addproduct/seller" >Add Product</Link>
                                </li>
                            </ul>
                        </div>
                      )
                  }
                  {
                      user.token && user.isAdmin && (
                        <div className="dropdown">
                            <Link to="#admin">
                                Admin <FontAwesomeIcon icon={faCaretDown}/>{" "}
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/productlist" >Products</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist" >Orders</Link>
                                </li>
                                <li>
                                    <Link to="/userlist" >User List</Link>
                                </li>
                            </ul>
                        </div>
                      )
                  }
              </div>
            </header>
        </div>
    )
}

export default Header
