import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./Users/UserContext";
import { Nav, NavDropdown } from 'react-bootstrap';
import logo from './CAL-3 copy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faHandsHelping} size="2x"/>


/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <div className="container-fluid m-2">
        <Nav>
        </Nav>
        <Nav>
          <NavLink className="nav-link text-dark" to="/users">
            People
          </NavLink>
          <div className="a-dark">
          <NavDropdown title="Preferences" id="nav-dropdown">
          <NavDropdown.Item href={`/success`}>Report Success</NavDropdown.Item>
            <NavDropdown.Item href={`/users/${currentUser.username}`}>Profile</NavDropdown.Item>
            <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
          </div>
        </Nav>
        </div>
    );
  }

  function loggedOutNav() {
    return (
      <div className="navbar container-fluid m-2">
        <Nav>
        </Nav>
        <Nav className="justify-content-end">
        <NavLink className="nav-link text-dark text-bold" to="/users">
            People
          </NavLink>
          <NavLink className="nav-link text-dark text-dark justify-content-end" to="/signup">
            Sign up
          </NavLink>
          <NavLink className="nav-link text-dark text-dark justify-content-end" to="/login">
            Login
          </NavLink>
        </Nav>
        </div>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md pt-0 pb-0">
      <a className="mx-3 navbar-brand text-secondary" href="/">
        {element}
      </a>
      <span class="navbar-brand mb-0 h1">CAL</span>
        {currentUser ? loggedInNav() : loggedOutNav()}
        {/* {loggedInNav()} */}
    </nav>
  );
}

export default NavBar;
