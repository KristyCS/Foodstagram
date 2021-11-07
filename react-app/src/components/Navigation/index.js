
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
    const user = useSelector(state => state.session.user);
    let sessionLinks;

    if (user) {
        sessionLinks = (
            <>
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
    } else {
        sessionLinks = (
            <>
                <div id="login-nav">
                    <NavLink id="nav-lbtn" to='/login' exact={true} activeClassName='active'>
                        Log In
                    </NavLink>
                </div>
                <div id="signup-nav">
                    <NavLink id="nav-sbtn" to='/sign-up' exact={true} activeClassName='active'>
                        Sign Up
                    </NavLink>
                </div>
            </>
        )
    }


  return (
    <nav id="nav-container">
        <div>
          <NavLink id="home-link" to='/' exact={true} activeClassName='active'>
            Foodstagram
          </NavLink>
        </div>
        <div id="nav-buttons">
            {sessionLinks}
        </div>
    </nav>
  );
}

export default NavBar;
