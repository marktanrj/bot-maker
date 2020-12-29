import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import isLoggedInCheck from "../../utils/isLoggedInCheck";

interface Props {
  component: React.ElementType;
  [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(autoSignInUser());
  // }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        !!isLoggedInCheck() ? (
          <React.Fragment>
            <NavigationBar />
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
