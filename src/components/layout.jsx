import React, {PropTypes} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem} from 'react-bootstrap';
import Octicon from 'react-octicon';

const Layout = ({children}) => (
  <div>
    <Navbar style={{position: 'absolute', top: 0, left: 0, right: 0}}>
      <NavbarBrand>NetSwarm Simulator</NavbarBrand>
      <Nav pullRight>
        <NavItem href='https://github.com/wvengen/netswarm-arduino'><Octicon name='mark-github' /> Arduino</NavItem>
        <NavItem href='https://github.com/wvengen/netswarm-simulator' active><Octicon name='mark-github' /> Simulator</NavItem>
        <NavItem href='https://github.com/wvengen/netswarm-webapp'><Octicon name='mark-github' /> Monitor</NavItem>
      </Nav>
    </Navbar>
    <div className="container" style={{position: 'absolute', top: 75, bottom: 25, left: 0, right: 0}}>
      {children}
    </div>
  </div>
);

export default Layout;
