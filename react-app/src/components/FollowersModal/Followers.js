import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Followers.css';


function Followers({ username, setShowModal }) {
    const [followersList, setfollowersList] = useState([]);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${username}/followers`);
            const fetchedUsers = await response.json();
            setfollowersList(fetchedUsers.followers);
        })();

    }, [username]);


    return (
        <>
            <div className="follow-cont">
                <div className="follow-div">Followers</div>
                <div>
                    <ul>
                        {followersList.map((follower, idx) => (
                            <li key={idx} className="follow-list">
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
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );

}


export default Followers;
