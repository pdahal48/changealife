import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({ exact, path, children }) {
  // const { currentUser } = useContext(UserContext);

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;
