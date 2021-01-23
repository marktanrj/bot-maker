import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "../CommonComponents/PrivateRoute";
import ToastComponent from "../CommonComponents/ToastComponent";
import isLoggedInCheck from "../../utils/isLoggedInCheck";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import NavigationBar from "../CommonComponents/NavigationBar/NavigationBar";
import LoadingScreen from "../CommonComponents/LoadingScreen";
const SignInPage = React.lazy(() => import("../SignInPage"));
const RegisterPage = React.lazy(() => import("../RegisterPage"));
const NotFoundPage = React.lazy(() => import("../NotFoundPage"));
const DashboardPage = React.lazy(() => import("../DashboardPage"));
const BuilderPage = React.lazy(() => import("../BuilderPage"));

function App() {
  const user = useSelector((state: RootState) => state.userReducer.user);

  useEffect(() => {}, [user]); //to refresh this component to display/hide navbar

  return (
    <div className="bg-gray-200 min-h-screen">
      <ToastComponent />
      <LoadingScreen />
      <Router>
        <PrivateRoute component={NavigationBar} />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" render={() => (isLoggedInCheck() ? <Redirect to="/dashboard" /> : <Redirect to="/signin" />)} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />
            <PrivateRoute exact path="/builder" component={BuilderPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
