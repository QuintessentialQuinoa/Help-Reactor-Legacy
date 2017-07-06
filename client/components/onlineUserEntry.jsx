import React from 'react';

const OnlineUserEntry = ({user, resTime}) => {
  console.log(user);
  return (
    <div className="modal-entry-container">
    <img className="modal-entry-img" src={user.avatarUrl} />
    <div className="modal-entry-name modal-entry">
      <a href={`https://www.github.com/${user.username}`} target="_blank">
        <div>{user.firstName} {user.lastName}</div>
      </a>
    </div>
    <div className="modal-entry-username modal-entry">{user.username}</div>
    <div className="modal-entry-username modal-entry">{resTime} Minutes</div>
    <button className="modal-entry-video-chat modal-entry fa fa-video-camera"></button>
    </div>
  );
};

export default OnlineUserEntry;