import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Following from './Following';

function FollowingModal({followingCount, followingList}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p onClick={() => setShowModal(true)}>{followingCount} following</p>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Following followingList={followingList}/>
        </Modal>
      )}
    </>
  );
}

export default FollowingModal;
