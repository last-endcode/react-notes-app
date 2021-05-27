import React, { useEffect } from 'react';

function Notification({ type, msg, removeNotif }) {
  useEffect(() => {
    const notification = setTimeout(() => {
      removeNotif();
    }, 2000);
    return () => clearTimeout(notification);
  });

  return (
    <>
      <p className={`notif notif-${type}`}>{msg}</p>
    </>
  );
}

export default Notification;
