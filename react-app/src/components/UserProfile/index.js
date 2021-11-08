
import React from 'react';
import { useSelector } from 'react-redux';



import './UserProfile.css';


const UserProfile = () => {
    const user = useSelector(state => state.session.user);

    return (
        <div className = "prof-cont">
            <div className = "dis-pic-cont">
                <img id = "dis-pic" src = {user.profile_photo} />
            </div>
            <div className = "prof-details">
                <div>
                    <p>{user.username}</p>
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
