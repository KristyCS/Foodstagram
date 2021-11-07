
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {

   let sessionLinks = (
        <>
            <div>
                <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                </NavLink>
            </div>
            <div>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>
            </div>
            <div>
                <NavLink to='/users' exact={true} activeClassName='active'>
                    Users
                </NavLink>
            </div>
            <div>
                <LogoutButton />
            </div>
        </>
    )


  return (
    <nav id="nav-container">
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div id="nav-buttons">
            {sessionLinks}
        </div>

    </nav>
  );
}

export default NavBar;
