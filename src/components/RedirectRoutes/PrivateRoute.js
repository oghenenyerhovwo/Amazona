import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
    component: Component, 
    ...rest
}) => {
    const {user} = useSelector(state => state.userInfo)
    return (
        <div>
            <Route {...rest} render={(props) =>
                user.token ? <Component {...props}></Component> :
                  <Redirect to="/signIn" />
            }></Route>
        </div>
    )
}

export default PrivateRoute
