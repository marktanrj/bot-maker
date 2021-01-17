import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { autoSignInUser } from "../../store/slices/userSlice";

import isLoggedInCheck from "../../utils/isLoggedInCheck";

interface Props {
  component: React.ElementType;
  [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoSignInUser());
  }, []);

  return <Route {...rest} render={(props) => (isLoggedInCheck() ? <Component {...props} /> : <Redirect to="/" />)} />;
};

export default PrivateRoute;
