import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'
import { AuthContext } from '../../context/auth-context'

export const NavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <ul className='nav-links'>
            {auth.isLoggedIn &&
                < li >
                    <NavLink to="/" exact>Home</NavLink>
                </li>
            }
            {auth.isLoggedIn &&
                <li>
                    <NavLink to="/completed">Completed</NavLink>
                </li>
            }
            {!auth.isLoggedIn &&
                <li>
                    <NavLink to="/auth">Authenticate</NavLink>
                </li>
            }
            {
                auth.isLoggedIn && <button onClick={auth.logout}>
                    Logout
                </button>
            }
        </ul >
    )
}
