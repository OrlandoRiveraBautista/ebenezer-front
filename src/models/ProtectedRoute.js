import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSession } from './GetSession';

export default function ProtectedRoute ({ component: Component, ...rest }) {
    return(
        <Route 
            {...rest}
            render={ props => getSession() === true 
                ? <Component { ...props } />
                : <Redirect to='/login' />
            } />
    );
}
