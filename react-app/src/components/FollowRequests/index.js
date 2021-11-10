import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import './FollowRequests.css';

function FollowRequests() {
  const user = useSelector(state => state.session.user);
  const [requests, setRequests] = useState([]);
  const [followerId, setfollowerId] = useState(0);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${user.username}/followRequests`);
            const fetchedUsers = await response.json();
            setRequests(fetchedUsers.followers);
        })();

    }, [user.username]);

    useEffect(async () => {
      if(followerId != 0) {
        const response = await fetch(`/api/follows/confirmRequest`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id,
            follower_id: followerId,
            confirmed: true
          })
        });

        if (response.ok) {
          const data = await response.json();
          setfollowerId(0);
        };
      }
  }, [followerId]);

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


  const onDelete = (e) => {
    e.preventDefault();

  };

  return (
      <div id="profile-div">
        <div id="profile-button" onClick={openMenu}>
            <i className="fas fa-user-plus" />
        </div>
        {showMenu && (
          <ul id="follow-dropdown">
              {requests.map((follower, idx) => (
                    <li key={idx} className="follow-list">
                      <div className="f-l-d">
                         <NavLink to={`/users/dashboard/${follower.username}`}>
                            <div className="f-l-c">
                              <img className="f-img" src={follower.profile_photo} alt="user dp"/>
                              <div className="f-d-c">
                                <p className="f-d-u">{follower.username}</p>
                                <p className="f-d-f">{follower.full_name}</p>
                              </div>
                            </div>
                          </NavLink>
                          <button id="conf-btn" onClick={ () => {setfollowerId(follower.id)}}>
                            Confirm
                          </button>
                          <button id="del-btn" onClick={onDelete}>Delete</button>
                      </div>
                    </li>
                ))}
          </ul>
        )}
      </div>
  );
}

export default FollowRequests;
