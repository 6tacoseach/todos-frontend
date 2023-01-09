import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'

export const NavLinks = () => {
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to="/completed">Completed Todos</NavLink>
            </li>
            <li>
                <NavLink to="auth">AUTHENTICATE</NavLink>
            </li>
        </ul>
    )
}
