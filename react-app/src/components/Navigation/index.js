
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/session';
import ProfileButton from './ProfileButton';
import './NavBar.css';

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const credential = "demo@demo.com";
    const password = "password";

    let sessionLinks;

    if (user) {
        sessionLinks = (
            <>
                <div>
                <NavLink className="home-link" to='/' exact={true} activeClassName='active'>
                    <i className="fas fa-home"></i>
                </NavLink>
                </div>
                <div id="frnds">
                    <NavLink id="frnds-btn" to='/user/follow-requests' exact={true} activeClassName='active'>
                        <i className="fas fa-user-plus"></i>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/users' exact={true} activeClassName='active'>
                        Users
                    </NavLink>
                </div>
                <ProfileButton />
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
                <div id="demo-btn"
                    onClick={() => dispatch(login(credential,password))}>
                    Demo User
                </div>
            </>
        )
    }


  return (
    <nav id="nav-container">
        <div>
          <NavLink className="home-link" to='/' exact={true} activeClassName='active'>
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
