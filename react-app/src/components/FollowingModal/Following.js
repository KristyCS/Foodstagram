import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";


function Following({ username, setShowModal }) {
    const [followingList, setfollowingList] = useState([]);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${username}/following`);
            const fetchedUsers = await response.json();
            setfollowingList(fetchedUsers.following);
        })();

    }, [username]);

    return (
        <>
            <div className="follow-cont">
                <div className="follow-div">Following</div>
                <div>
                    <ul>
                        {followingList.map((following, idx) => (
                                <li key={idx} className="follow-list">
                                    <NavLink to={`/users/dashboard/${following.username}`}
                                        onClick={() => setShowModal(false)}>
                                        <img src={following.profile_photo} alt="user dp"/>
                                        <p>{following.username}</p>
                                        <p>{following.full_name}</p>
                                    </NavLink>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    );

}


export default Following;
