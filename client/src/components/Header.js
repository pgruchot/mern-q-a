import React from 'react'
import withAuthContext from './withAuthContext';
import { Link } from 'react-router-dom';

//navbar component
export default withAuthContext(function Header(props) {
    return (
        <nav>
            <div className="nav-wrapper grey darken-3">
            <a href="/" className="brand-logo">MERN Q & A App</a>
            <ul id="nav-mobile" className="right">
                {props.context.isAuth ? (
                    <div>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#" onClick={(e) => props.context.logout(e)}>Logout</a></li>
                    </div>
                ) : (
                    <div>
                        <li className=""><Link to="/">Home</Link></li>
                        <li className=""><Link to="/login">Login</Link></li>
                        <li className=""><Link to="/signup">Signup</Link></li>
                    </div>
                )}
            </ul>
            </div>
        </nav>
    )
})
