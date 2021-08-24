import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Users/Login";
import SignUp from "./Users/SignUp";
import UserInfo from './People/UserInfo'
import Profile from "./Users/Profile";
import AboutUs from "./AboutUs";
import People from "./People/People";
import AddSuccess from "./AddSuccess";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({signup, loginUser, addStory }) {
  return (
      <div className="pt-0">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users">
            <People />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/login">
            <Login loginUser = {loginUser}/>
          </Route>
          <Route exact path="/users/:username">
            <UserInfo/>
          </Route>
          <Route exact path="/signup">
            <SignUp signup = {signup}/>
          </Route>
          <Route exact path="/about">
            <AboutUs/>
          </Route>
          <Route exact path="/success">
            <AddSuccess addStory = {addStory}/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
