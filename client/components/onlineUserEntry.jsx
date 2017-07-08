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
    this.videoRoom = this.onlineUser.id+this.onlineUser.role;
  }

  toggleCamera () {
    if (!this.state.showCamera) {
      this.Call(this.onlineUser, this.videoRoom);
      // var connection = new PeerConnection(`${this.onlineUser.id} ${this.onlineUser.name}`);
    }
    this.setState((prevState) => {
      return { showCamera: !prevState.showCamera };
    });
  }

  Call (user, myStream) {
    this.props.handleCall(user, myStream);
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
          <Modal.Body>
            <iframe 
            width='800' 
            height='640'
            src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=656adf00-f9d6-4a5c-b7c2-6c04a2b9eff0&iframe=true&room=${this.videoRoom}`}>
            </iframe>     
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleCamera}>Close</Button>
          </Modal.Footer>
      </Modal>
    )
  }

  render () {
    console.log(this.props.user.id !== this.props.appUser.id.toString())
    let userArea = null;
    let ableToVideoChat = null;

    if ((this.props.appUser.role === 'mentor' || (this.props.appUser.role === 'student' && this.props.user.role === 'student')) && (this.props.user.id !== this.props.appUser.id.toString())) {
      ableToVideoChat = <button onClick={this.toggleCamera} className="modal-entry-video-chat modal-entry fa fa-video-camera"></button>;
    } else {
      ableToVideoChat = <div>  No Video Chat Available  </div>
    }

    if (this.props.modalUserType === 'mentors') {
      userArea =
        <div className="modal-entry-container">
          <img className="modal-entry-img" src={this.props.user.avatarUrl} />
          <div className="modal-entry-name modal-entry">
            <a href={`https://www.github.com/${this.props.user.username}`} target="_blank">
              <div>{this.props.user.firstName} {this.props.user.lastName}</div>
            </a>
          </div>
          <div className="modal-entry-username modal-entry">{this.props.user.username}</div>
          <div className="modal-entry-username modal-entry">{this.props.responseTime} Minutes</div>
          <div className="modal-entry-username modal-entry">{this.props.resolutionTime} Minutes</div>
          {ableToVideoChat}
          {this.CameraModal()}
        </div>;
    } else if (this.props.modalUserType === 'students') {
      userArea =
        <div className="modal-entry-container">
          <img className="modal-entry-img" src={this.props.user.avatarUrl} />
          <div className="modal-entry-name modal-entry">
            <a href={`https://www.github.com/${this.props.user.username}`} target="_blank">
              <div>{this.props.user.firstName} {this.props.user.lastName}</div>
            </a>
          </div>
          <div className="modal-entry-username modal-entry">{this.props.user.username}</div>
          {ableToVideoChat}
          {this.CameraModal()}
        </div>;
    }

    return (
      <div>
        {userArea}
      </div>
    );
  }
}

export default OnlineUserEntry;