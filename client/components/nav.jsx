import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

const Nav = ({statistic, user}) => (
  <nav className="navbar navbar-default navbar-inverse">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Help Reactor</a>
      <div className="navbar-right">
        <div className="navbar-profile">
          <a href="/api/logout"><Button className="logoutbtn" bsSize="small">Logout</Button></a>
          <img src={user.avatarUrl} />
        </div>
      </div>
    </div>
  </nav>
);

export default Nav;
