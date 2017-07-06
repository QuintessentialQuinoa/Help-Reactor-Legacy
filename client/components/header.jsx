import React from 'react';
import OnlineUsers from './onlineUsers.jsx';

class Header extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalUserType: ''
    };
    this.openModal.bind(this);
  }

  closeModal () {
    this.setState({
      modalOpen: false
    });
  }

  openModal (userType) {
    this.props.getOnlineUsers(userType);
    this.setState({
      modalUserType: userType,
      modalOpen: true
    });
  }

  render () {
    let welcome = null;

    if (this.props.user && (this.props.user.role === 'admin' || this.props.user.role === 'mentor')) {
      welcome =
        <h4>
          There are currently 
          <span onClick={ () => this.openModal('mentors') }> {this.props.onlineUsers.mentor} mentors
          </span> and
          <span onClick={ () => this.openModal('students') }> {this.props.onlineUsers.student} students
          </span> online,
          and the estimated wait time is <span>{this.props.waitTime} minutes</span>.<br />
          There are currently <span>{this.props.statistic.open} open tickets </span>
          and <span>{this.props.statistic.closed} tickets closed today</span>.
        </h4>;
    }

    if (this.props.user && this.props.user.role === 'student') {
      welcome =
        <h4>
          The estimated wait time is <span>{this.props.waitTime} minutes</span>.
        </h4>;
    }

    return (
      <div className="page_header">
        <div className="container">
          <h3>Welcome back {this.props.user.firstName}!</h3>
          {welcome}
        </div>
        <OnlineUsers 
          userType={this.state.modalUserType}
          users={this.props.onlineUserInfo} 
          isOpen={this.state.modalOpen} 
          closeModal={this.closeModal.bind(this)} />
      </div>
    );
  }
};

export default Header;
