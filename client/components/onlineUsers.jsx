import React from 'react';
import OnlineUserEntry from './onlineUserEntry.jsx';

class OnlineUsers extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {handleCall, users, mentorResponseTime, mentorResolutionTime} = this.props;
    return (
      <div className="onlineUserContainer">
        <div className="modal-label-container onlineUserEntry">
          <div className="modal-label-null"></div>
          <div className="modal-label-entry">Name</div>
          <div className="modal-label-entry">Username</div>
          <div className="modal-label-entry">Avg. Response Time</div>
          <div className="modal-label-entry">Avg. Resolution Time</div>
          <div className="modal-label-entry right">Video Chat Mentor</div>
        </div>
        {users.map((user, index) => {
          var id = user.id;
          var findMentor = (mentor) => {
            return Object.keys(mentor)[0] === id;
          };
          var mentorResponse = mentorResponseTime.find(findMentor);
          var mentorResolution = mentorResolutionTime.find(findMentor);
          var responseTime = mentorResponse[Object.keys(mentorResponse)[0]];
          var resolutionTime = mentorResolution[Object.keys(mentorResolution)[0]];
          return <OnlineUserEntry handleCall={handleCall} key={index} user={user} responseTime={responseTime} resolutionTime={resolutionTime}/>;
        })}
      </div>
    );
  }
};

export default OnlineUsers;