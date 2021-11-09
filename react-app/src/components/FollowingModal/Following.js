import React from 'react';


function Following({followingList}) {
    const followList = followingList.filter(follow => follow.confirmed === true)
    return (
        <>
            <div>FOLLOWING</div>
            <div>
                <ul>
                    {followList.map((follow, idx) => (
                        <li key={idx}>
                            {follow.id}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

}


export default Following;
