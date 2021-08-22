import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./Users/UserContext";
import { Nav, NavDropdown } from 'react-bootstrap';
import logo from './CAL-3 copy.png'

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
      <div className="container-fluid">
        <Nav>
        </Nav>
        <Nav>
          <NavLink className="nav-link text-dark" to="/people">
            People
          </NavLink>
          <div className="a-dark">
          <NavDropdown title="Preferences" id="nav-dropdown">
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
      <div className="container-fluid">
        <Nav>
        </Nav>
        <Nav className="justify-content-end">
        <NavLink className="nav-link text-dark" to="/people">
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
      <a className="navbar-brand" href="/">
        <img src={logo}  width="50" height="37" className="logo d-inline-block align-top m-0" alt="brand photo" />
      </a>
        {currentUser ? loggedInNav() : loggedOutNav()}
        {/* {loggedInNav()} */}
    </nav>
  );
}

export default NavBar;
