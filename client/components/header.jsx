import React from 'react';
//import Modal from 'react-modal';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import OnlineUsers from './onlineUsers.jsx';

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      modalUserType: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  openModal(userType) {
    this.props.getOnlineUsers(userType);
    this.setState({
      modalUserType: userType,
      showModal: true
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
        <Modal 
          show={this.state.showModal} 
          onHide={this.closeModal}
          bsSize='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Online {this.state.modalUserType.charAt(0).toUpperCase() + this.state.modalUserType.slice(1)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OnlineUsers 
              handleCall={this.props.handleCall}
              users={this.props.onlineUserInfo} 
              mentorResponseTime={this.props.mentorResponseTime} 
              mentorResolutionTime={this.props.mentorResolutionTime} 
              modalUserType={this.state.modalUserType}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default Header;
