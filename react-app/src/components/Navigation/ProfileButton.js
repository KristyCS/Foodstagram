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
    history.push("/");
  };

  let profileDisplay;
  if(user.profile_photo) {
    profileDisplay = (
      <>
        <img id = "prof-pic" src = {user.profile_photo} alt="user dp small"/>
      </>
    )
  } else {
    profileDisplay = (
      <>
        <i className="fas fa-user-circle" />
      </>
    )
  }

  return (
      <div id="profile-div">
        <div id="profile-button" onClick={openMenu}>
          { profileDisplay }
        </div>
        {showMenu && (
          <ul id="profile-dropdown">
            <li className="prof-list-item">
              <NavLink className="prof-link" to={`/users/dashboard/${user.username}`}>
                <i className="far fa-user-circle" /> Profile
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
