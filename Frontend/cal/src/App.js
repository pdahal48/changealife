import React, {useState, useEffect} from 'react'
import Routes from './Routes';
import {BrowserRouter} from 'react-router-dom'
import NavBar from './NavBar';
import { CalAPI as API } from './Api'
import useLocalStorage from './Hooks'
import UserContext from './Users/UserContext';
import jwt from 'jsonwebtoken'
import LoadingSpinner from "./LoadingSpinner";

import './App.css';
import { Row, Col } from 'react-bootstrap';
export const TOKEN_STORAGE_ID = "Cal-token";

require('dotenv').config()

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currUserToken, setCurrUserToken] = useLocalStorage(TOKEN_STORAGE_ID)


  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", currUserToken);

    async function getCurrentUser() {
      if (currUserToken) {
        try {
          let { username } = jwt.decode(currUserToken);
          // put the currUserToken on the Api class so it can use it to call the API.
          API.token = currUserToken;
          let currentUser = await API.get(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [currUserToken]);


  async function signup(signupData) {
    try {
      let res = await API.signup(signupData);
      if (res.token) {
        setCurrUserToken(res.token);
        return {success: true}
      } else {
        return res.erros
      }
    } catch (e) {
      console.error("signup failed", e);
      return { success: false, e };
    }
  }

  async function loginUser(data) {
    try {
      let token = await API.login(data);
      setCurrUserToken(token);
      return {success: true}
    } catch (errors) {
      return {success: false, errors}
    }
  }

  function logout() {
    setCurrentUser(null);
    setCurrUserToken(null);
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
        <BrowserRouter>
          <UserContext.Provider 
            value = {{setCurrentUser, currentUser}}
          >
            <NavBar logout = {logout}/>
                <Routes signup={signup} loginUser = {loginUser} />
          </UserContext.Provider>
        </BrowserRouter>

      <Row className = "footer container-fluid justify-content-bottom text-center">
        <Col className="col-12">
        <footer className="page-footer font-small blue mb-5">
          <div className="footer-copyright text-center py-3">© 2021 Copyright:
            <a href="https://localhost:3000/"> Cal.com</a> <br></br>
            <a href="/about"> About us</a>
          </div>
        </footer>
        </Col>
      </Row>
    </div> 
  );
}

export default App;
