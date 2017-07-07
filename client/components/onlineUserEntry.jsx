import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import SetCamera from './Camera.jsx';

class OnlineUserEntry extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      stream: '',
      showCamera: false
    };
    this.toggleCamera = this.toggleCamera.bind(this);
  }

  toggleCamera () {
    if (!this.state.showCamera) {
      var camera = this.Camera();
      navigator.getUserMedia(camera.constraints, camera.onSuccess, camera.onError);
    } else {
      console.log(this.state.stream);
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
        stream: stream
      });
      this.Call(this.props.user, stream);
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
            <video src={this.state.stream} autoPlay></video>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleCamera}>Close</Button>
          </Modal.Footer>
      </Modal>
    )
  }

  render () {
    let userArea = null;

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
          <button onClick={this.toggleCamera} className="modal-entry-video-chat modal-entry fa fa-video-camera"></button>
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
          <button onClick={this.toggleCamera} className="modal-entry-video-chat modal-entry fa fa-video-camera"></button>
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