import React from 'react';

const OnlineUserEntry = ({user}) => {
  console.log(user);
  return (
    <div className="modal-entry-container">
    <img className="modal-entry-img" src={user.avatarUrl} />
    <a href={`https://www.github.com/${user.username}`} target="_blank"><span className="modal-entry-name">{user.firstName} {user.lastName}</span></a> - <span className="modal-entry-username">{user.username}</span>
    </div>
  );
};

export default OnlineUserEntry;