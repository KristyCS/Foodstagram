import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Followers from './Followers';

function FollowersModal({followersCount, username, setRerender, rerender}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p onClick={() => setShowModal(true)}>{followersCount} followers</p>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Followers
              username={username}
              setShowModal={setShowModal}
              setRerender={setRerender}
              rerender={rerender}
            />
          </Modal>
        )}
    </>
  );
}

export default FollowersModal;
