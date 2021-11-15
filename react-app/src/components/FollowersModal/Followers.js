import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import './Followers.css';


function Followers({ username, setShowModal, setRerender, rerender }) {
    const user = useSelector(state => state.session.user);
    const [followersList, setfollowersList] = useState([]);
    const [deleteReqId, setdeleteReqId] = useState(0);
    const [requestBoolean, setRequestBoolean] = useState(false);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${username}/followers`);
            const fetchedUsers = await response.json();
            setfollowersList(fetchedUsers.followers);
        })();

    }, [username, requestBoolean]);

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
            //   const data = await response.json();
              setdeleteReqId(0);
              setRequestBoolean(!requestBoolean)
              setRerender(!rerender)
            };
         })();
        }
    }, [deleteReqId, requestBoolean, rerender, setRerender, user.id]);


    return (
        <>
            <div className="follow-cont">
                <div className="follow-div">Followers</div>
                <div>
                    <ul>
                        {followersList.map((follower, idx) => (
                            <li key={idx} className="follow-list">
                                <div className="f-l-d">
                                    <NavLink to={`/users/dashboard/${follower.username}`}
                                        onClick={() => setShowModal(false)}>
                                        <div className="f-l-c">
                                            <img className="f-img" src={follower.profile_photo} alt="user dp"/>
                                            <div className="f-d-c">
                                                <p className="f-d-u">{follower.username}</p>
                                                <p className="f-d-f">{follower.full_name}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                    {(user.username === username) &&
                                                <button id="remv-btn" onClick={() =>
                                                    {setdeleteReqId(follower.id)}}>
                                                        Remove
                                                </button>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );

}


export default Followers;
