import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PublicRoutes = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {
    return (
        <>
        {
            isLoggedIn 
            ? (<Route {...rest} component={Component}/>)
            : (<Redirect to='/auth/login'/>)
        }
          </>  
    )
}

PublicRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}