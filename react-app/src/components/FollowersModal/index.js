import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Followers from './Followers';

function FollowersModal({followersCount, username}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p onClick={() => setShowModal(true)}>{followersCount} followers</p>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Followers username={username}/>
          </Modal>
        )}
    </>
  );
}

export default FollowersModal;
