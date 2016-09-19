import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {MenuItem, Nav, Navbar, NavbarBrand, NavDropdown, NavItem} from 'react-bootstrap';
import Octicon from 'react-octicon';

import examples from '../examples/index';
import {actions} from '../store/code';

const Layout = ({dispatch, example, children}) => (
  <div>
    <Navbar style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1}}>
      <NavbarBrand>NetSwarm Simulator</NavbarBrand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <NavDropdown title='Examples' id='nav-examples'>
            {examples.map(ex => (
              <NavItem key={ex.id} href={'#/' + ex.id} active={ex.id === example}
                       onClick={() => dispatch(actions.loadExample(ex.id))}>
                {ex.title}
              </NavItem>
            ))}
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem href='https://github.com/wvengen/netswarm-arduino'><Octicon name='mark-github' /> Arduino</NavItem>
          <NavItem href='https://github.com/wvengen/netswarm-simulator' active><Octicon name='mark-github' /> Simulator</NavItem>
          <NavItem href='https://github.com/wvengen/netswarm-webapp'><Octicon name='mark-github' /> Monitor</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className="container" style={{position: 'absolute', top: 75, bottom: 25, left: 0, right: 0}}>
      {children}
    </div>
  </div>
);
Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  example: PropTypes.string,
};

export default connect(
  ({code: {example}}) => ({example})
)(Layout);
