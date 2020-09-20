import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const MainNavigation = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const auth = useContext(AuthContext);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">PJDW Challenge</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {!auth.token && <NavItem>
              {/* <NavLink tag={Link} to="/auth">Login</NavLink> */}
              <NavLink tag={RRNavLink} exact to="/auth" activeClassName="active">Login</NavLink>
            </NavItem>}
            {auth.token && <NavItem>
              {/* <NavLink tag={Link} to="/dashboard">Dashboard</NavLink> */}
              <NavLink tag={RRNavLink} exact to="/dashboard" activeClassName="active">Dashboard</NavLink>
            </NavItem>}
            {auth.token && <NavItem>
              {/* <NavLink tag={Link} to="/dashboard">Dashboard</NavLink> */}
              <NavLink tag={RRNavLink} exact to="/" onClick={auth.logout} activeClassName="active">Log out</NavLink>
            </NavItem>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainNavigation;
