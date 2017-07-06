import React from 'react';

const OnlineUserEntry = ({user}) => {
  console.log(user);
  return (
    <div className="modal-entry-container">
    <img className="modal-entry-img" src={user.avatarUrl} />
    <span className="modal-entry-name">{user.firstName} {user.lastName}</span> - <span className="modal-entry-username">{user.username}</span>
    </div>
  );
};

export default OnlineUserEntry;