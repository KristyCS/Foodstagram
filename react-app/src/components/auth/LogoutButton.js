import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  if(user) {
    return <button onClick={onLogout}>Logout</button>;
  } else {
    return null;
  }
};

export default LogoutButton;
