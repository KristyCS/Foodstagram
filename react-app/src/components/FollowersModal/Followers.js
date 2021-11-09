import React from 'react';


function Followers({followersList}) {
    const followers = followersList.filter(follower => follower.confirmed === true)

    return (
        <>
            <div>FOLLOWERS</div>
            <div>
                <ul>
                    {followers.map((follower, idx) => (
                        <li key={idx}>
                            {follower.id}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

}


export default Followers;
