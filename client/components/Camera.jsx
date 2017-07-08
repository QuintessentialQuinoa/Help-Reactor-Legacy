// import SimpleWebRTC from 'simplewebrtc';

// class PeerConnection {
//   consructor (user) {
//     this.webrtc = new SimpleWebRTC({
//       // the id/element dom element that will hold "our" video 
//       localVideoEl: 'localStream',
//       // the id/element dom element that will hold remote videos 
//       remoteVideosEl: 'remoteStream',
//       // immediately ask for camera access 
//       autoRequestMedia: true
//     });
//   }

//   connect () {
//     webrtc.on('readyToCall', function () {
//       // you can name it anything 
//       webrtc.joinRoom(user);
//     });
//   }


// }


// class PeerConnection {

//   consructor (localStream) {
//     this.localStream = localStream;
//     this.peerConnectionConfig = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
//     this.remoteVideo = {};
//   }

//   start (isCaller) {
//     this.peerConnection = new RTCPeerConnection(this.peerConnectionConfig);
//     this.peerConnection.onicecandidate = this.gotIceCandidate;
//     this.peerConnection.onaddstream = this.gotRemoteStream;
//     this.peerConnection.addStream(this.localStream);
//     if(isCaller) {
//         peerConnection.createOffer(this.gotDescription, this.createOfferError);
//     }
//   }

//   gotDescription (description) {
//     console.log('got description');
//     this.peerConnection.setLocalDescription(description, function () {
//         serverConnection.send(JSON.stringify({'sdp': description}));
//     }, function() {console.log('set description error')});
//   }

//   gotIceCandidate (event) {
//     if(event.candidate != null) {
//         serverConnection.send(JSON.stringify({'ice': event.candidate}));
//     }
//   }

//   gotRemoteStream (event) {
//     console.log('got remote stream');
//     remoteVideo.src = window.URL.createObjectURL(event.stream);
//   }

//   createOfferError (error) {
//     console.log(error);
//   }

//   gotMessageFromServer (message) {
//     if(!this.peerConnection) start(false);

//     var signal = JSON.parse(message.data);
//     if(signal.sdp) {
//         this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp), function() {
//             if(signal.sdp.type == 'offer') {
//                 this.peerConnection.createAnswer(gotDescription, createAnswerError);
//             }
//         });
//     } else if(signal.ice) {
//         this.peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));
//     }
//   }

// };

// export default PeerConnection;