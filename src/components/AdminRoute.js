import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({
    component: Component, 
    ...rest
}) => {
    const {user} = useSelector(state => state.userInfo)
    return (
        <div>
            <Route {...rest} render={(props) =>
                user.token && user.isAdmin ? <Component {...props}></Component> :
                  <Redirect to="/signIn" />
            }></Route>
        </div>
    )
}

export default AdminRoute
