import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import withAuthContext from './withAuthContext';

//currently not used, route that renders only for logged in users
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route render={ props => rest.context.isAuth ? <Component {...props} /> : (null)} {...rest} />
)

export default withAuthContext(ProtectedRoute);