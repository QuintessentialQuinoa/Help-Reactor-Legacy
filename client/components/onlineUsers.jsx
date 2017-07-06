import React from 'react';
import Modal from 'react-modal';
import OnlineUserEntry from './onlineUserEntry.jsx';

var ModalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(200, 200, 200, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '50px',
    left                       : '30%',
    right                      : '30%',
    bottom                     : '50px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '5px',
    outline                    : 'none',
    padding                    : '20px'
 
  }
};

const OnlineUsers = ({users, isOpen, closeModal}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      style={ModalStyle}
      onRequestClose={closeModal} 
      contentLabel="Online Users">
      <div>
        <h1>Online Users</h1>
        <hr/>
        <div>
          <div>
            {users.map((user, index) => {
              return <OnlineUserEntry key={index} user={user} />;
            })}
          </div>
          <div className="modal-close">
            <button className='btn btn-xs btn-primary claim_btn modal-close-btn' onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};


export default OnlineUsers;