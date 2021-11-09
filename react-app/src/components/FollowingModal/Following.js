import React, { useState, useEffect } from 'react';


function Following({ username }) {
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
                                <img src={following.profile_photo} alt="user dp"/>
                                <p>{following.username}</p>
                                <p>{following.full_name}</p>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    );

}


export default Following;
