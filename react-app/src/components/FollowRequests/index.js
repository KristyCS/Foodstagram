import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import './FollowRequests.css';

function FollowRequests() {
  const user = useSelector(state => state.session.user);
  const [requests, setRequests] = useState([]);
  const [followerId, setfollowerId] = useState(0);
  const [deleteReqId, setdeleteReqId] = useState(0);
  const [requestBoolean, setRequestBoolean] = useState(false);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${user.username}/followRequests`);
            const fetchedUsers = await response.json();
            setRequests(fetchedUsers.followers);
        })();

    }, [user.username, requestBoolean]);

    useEffect(() => {
      if(followerId !== 0) {
        (async () => {
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
            setRequestBoolean(!requestBoolean)
          };
       })();
      }
  }, [followerId]);

  useEffect(() => {
    if(deleteReqId !== 0) {
      (async () => {
        const response = await fetch(`/api/follows/unfollow`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id,
            follower_id: deleteReqId,
            confirmed: false
          })
        });

        if (response.ok) {
          const data = await response.json();
          setdeleteReqId(0);
          setRequestBoolean(!requestBoolean)
        };
     })();
    }
}, [deleteReqId]);

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
          <ul id="follow-dropdown">
            {!requests.length && <li className="no-list">No pending requests</li> }
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
                          <button id="del-btn" onClick={() => {setdeleteReqId(follower.id)}}>Delete</button>
                      </div>
                    </li>
                ))}
          </ul>
        )}
      </div>
  );
}

export default FollowRequests;
