import React from 'react';
import OnlineUserEntry from './onlineUserEntry.jsx';

class OnlineUsers extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {users, mentorResTime} = this.props;
    return (
      <div className="onlineUserContainer">
        <div className="modal-label-container">
          <div className="modal-label-entry"></div>
          <div className="modal-label-entry">Name</div>
          <div className="modal-label-entry">Username</div>
          <div className="modal-label-entry">Avg. Response Time</div>
          <div className="modal-label-entry"></div>
        </div>
        {users.map((user, index) => {
          var id = user.id;
          var findMentor = (mentor) => {
            return Object.keys(mentor)[0] === id;
          };
          var mentorObj = mentorResTime.find(findMentor);
          var resTime = mentorObj[Object.keys(mentorObj)[0]];
          return <OnlineUserEntry key={index} user={user} resTime={resTime}/>;
        })}
      </div>
    );
  }
};


export default OnlineUsers;