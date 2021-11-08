
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './UserProfile.css';


const UserProfile = () => {
    const user = useSelector(state => state.session.user);
    const { username } = useParams();
    const [selectedUser, setselectedUser] = useState({});

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/dashboard/${username}`);
            const fetchedUser = await response.json();
            setselectedUser(fetchedUser);
        })();
    }, [username]);

    return (
        <div className = "prof-cont">
            <div className = "dis-pic-cont">
                <img id = "dis-pic" src = {selectedUser.profile_photo} />
            </div>
            <div className = "prof-details">
                <div>
                    <p>{selectedUser.username}</p>
                </div>
                <div>

                </div>
                <div>

                </div>

            </div>
        </div>
    );

}

export default UserProfile;
