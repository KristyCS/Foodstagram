import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import './FollowRequests.css';

function FollowRequests() {
  const user = useSelector(state => state.session.user);
  const [requests, setRequests] = useState([]);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${user.username}/followRequests`);
            const fetchedUsers = await response.json();
            setRequests(fetchedUsers.followers);
        })();

    }, [user.username]);

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


  return (
      <div id="profile-div">
        <div id="profile-button" onClick={openMenu}>
            <i className="fas fa-user-plus" />
        </div>
        {showMenu && (
          <ul id="profile-dropdown">
              {requests.map((follower, idx) => (
                    <li key={idx} className="follow-list">
                         <NavLink to={`/users/dashboard/${follower.username}`}>
                            <img src={follower.profile_photo} alt="user dp"/>
                            <p>{follower.username}</p>
                            <p>{follower.full_name}</p>
                        </NavLink>
                    </li>
                ))}
          </ul>
        )}
      </div>
  );
}

export default FollowRequests;
