import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import SetCamera from './Camera.jsx';

class OnlineUserEntry extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      localStream: {},
      localStreamURL: '',
      showCamera: false
    };
    this.toggleCamera = this.toggleCamera.bind(this);
  }

  toggleCamera () {
    if (!this.state.showCamera) {
      var camera = this.Camera();
      navigator.mediaDevices.getUserMedia(camera.constraints)
      .then(camera.onSuccess)
      .catch(camera.onError);
      // navigator.getUserMedia(camera.constraints, camera.onSuccess, camera.onError);
    } else {
      this.state.localStream.getTracks().forEach(track => track.stop());
    }
    this.setState((prevState) => {
      return { showCamera: !prevState.showCamera };
    });
  }

  Call (user, myStream) {
    this.props.handleCall(user, myStream);
  }

  Camera () {
    return SetCamera((stream) => {
      this.setState({
        localStream: stream,
        localStreamURL: window.URL.createObjectURL(stream)
      });
      this.Call({
        id: this.props.user.id,
        role: this.props.user.role,
        name: `${this.props.user.firstName} ${this.props.user.lastName}`
      }, this.state.localStreamURL);
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
          <Modal.Body>
            <video src={!!this.props.remoteStreamURL ? this.props.remoteStreamURL : this.state.localStreamURL} autoPlay></video>
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