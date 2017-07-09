import React from 'react';
import OnlineUserEntry from './onlineUserEntry.jsx';

class OnlineUsers extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {appUser, 
          cancelCall,
          remoteStreamURL, 
          handleCall, 
          users, 
          mentorResponseTime, 
          mentorResolutionTime, 
          modalUserType} = this.props;
    let onlineUsers = null;
    
    if (modalUserType === 'mentors') {
      onlineUsers =
        <div className="onlineUserContainer">
          <div className="modal-label-container onlineUserEntry">
            <div className="modal-label-null"></div>
            <div className="modal-label-entry">Name</div>
            <div className="modal-label-entry">Username</div>
            <div className="modal-label-entry">Avg. Response Time</div>
            <div className="modal-label-entry">Avg. Resolution Time</div>
            <div className="modal-label-entry right">Video Chat Mentor</div>
          </div>
          {users.mentors.map((user, index) => {
            var id = user.id;

            var findMentor = (mentor) => {
              return Object.keys(mentor)[0] === id;
            };
            var mentorResponse = mentorResponseTime.find(findMentor);
            var mentorResolution = mentorResolutionTime.find(findMentor);
            var responseTime = mentorResponse[Object.keys(mentorResponse)[0]];
            var resolutionTime = mentorResolution[Object.keys(mentorResolution)[0]];
            return <OnlineUserEntry
              modalUserType={modalUserType}
              handleCall={handleCall}
              key={index}
              user={user}
              responseTime={responseTime}
              resolutionTime={resolutionTime}
              appUser={appUser}/>;
          })}
        </div>;
    } else if (modalUserType === 'students') {
      onlineUsers =
        <div className="onlineUserContainer">
          <div className="modal-label-container onlineUserEntry">
            <div className="modal-label-null"></div>
            <div className="modal-label-entry">Name</div>
            <div className="modal-label-entry">Username</div>
            <div className="modal-label-entry">Tickets/Day Avg</div>
            <div className="modal-label-entry right">Video Chat Mentor</div>
          </div>
          {users.students.map((user, index) => {
            return <OnlineUserEntry
              cancelCall={cancelCall}
              modalUserType={modalUserType}
              handleCall={handleCall}
              key={index}
              user={user}
              appUser={appUser}/>;
          })}
        </div>;
    }

    return (
      <div>
        {onlineUsers}
      </div>
    );
  }
};

export default OnlineUsers;