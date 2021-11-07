import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { logout }  from '../../store/session';
import './ProfileButton.css';

function ProfileButton() {
  const user = useSelector(state => state.session.user);
  const history = useHistory();

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
      <div id="profile-div">
        <button id="profile-button" onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <ul id="profile-dropdown">
            <li className="prof-list-item">
              <NavLink className="story-link" to={`/user/dashboard`}>
              <i className="fas fa-user-circle" /> Profile
              </NavLink>
            </li>
            <li className="prof-list-item">
              <button id="logout-btn" onClick={onLogout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
  );
}

export default ProfileButton;
