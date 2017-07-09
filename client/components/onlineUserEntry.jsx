import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class OnlineUserEntry extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      localStream: {},
      localStreamURL: '',
      showCamera: false
    };
    this.toggleCamera = this.toggleCamera.bind(this);
    this.onlineUser = {
         id: this.props.user.id,
         role: this.props.user.role,
         name: `${this.props.user.firstName} ${this.props.user.lastName}`
    };
    this.videoRoom = this.onlineUser.id + this.onlineUser.role + this.props.appUser.id + this.props.appUser.role;
  }

  toggleCamera () {
    console.log(this.videoRoom);
    if (!this.state.showCamera) {
      this.props.handleCall(this.onlineUser, this.videoRoom);
    } else {
      this.props.cancelCall(this.onlineUser);
    }
    this.setState((prevState) => {
      return { showCamera: !prevState.showCamera };
    });
  }

  CameraModal () {
    return (
      <Modal
          show={this.state.showCamera}
          bsSize='large'
          onHide={this.toggleCamera}>
          <Modal.Header closeButton>
          <Modal.Title>Video Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass="modalBodySize">
            <iframe 
            scrolling='no'
            src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=${window.embedId}&iframe=true&room=${this.videoRoom}`}>
            </iframe>     
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={this.toggleCamera}>Close</Button>
          </Modal.Footer>
      </Modal>
    )
  }

  render () {
    let userArea = null;
    let ableToVideoChat = null;

    // TODO: CHANGE BACK AFTER TESTING
    if ((this.props.appUser.role === 'mentor' || (this.props.appUser.role === 'student' && this.props.user.role === 'student')) && (this.props.user.id !== this.props.appUser.id.toString())) {
      ableToVideoChat = <button onClick={this.toggleCamera} className="btn btn-success modal-entry-video-chat modal-entry fa fa-video-camera"></button>;
    } else {
      ableToVideoChat = <button onClick={this.toggleCamera} className="disabled btn btn-danger modal-entry-video-chat modal-entry fa fa-video-camera" disabled></button>;
    }

    userArea =
      <div className="modal-entry-container">
        <img className="modal-entry-img" src={this.props.user.avatarUrl} />
        <div className="modal-entry-middle">
          <a href={`https://www.github.com/${this.props.user.username}`} target="_blank">
            {this.props.user.firstName} {this.props.user.lastName}
          </a>
        </div>
        <div className="modal-entry-middle">{this.props.user.username}</div>
        {this.props.modalUserType === 'students' ?
          <div className="modal-entry-middle">{this.props.user.ticketsPerDay}</div> : null}
        {this.props.modalUserType === 'mentors' ? 
          <div className="modal-entry-middle">{this.props.responseTime} Minutes</div> : null }
        {this.props.modalUserType === 'mentors' ? 
          <div className="modal-entry-middle">{this.props.resolutionTime} Minutes</div> : null }
        {ableToVideoChat}
        {this.CameraModal()}
      </div>;

    return (
      <div>
        {userArea}
      </div>
    );
  }
}

export default OnlineUserEntry;
