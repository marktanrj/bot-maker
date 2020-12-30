import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "../Common/PrivateRoute";
import ToastComponent from "../Common/ToastComponent";
import isLoggedInCheck from "../../utils/isLoggedInCheck";

import NavigationBar from "../Common/NavigationBar/NavigationBar";
const SignInPage = React.lazy(() => import("../SignInPage"));
const RegisterPage = React.lazy(() => import("../RegisterPage"));
const NotFoundPage = React.lazy(() => import("../NotFoundPage"));
const DashboardPage = React.lazy(() => import("../DashboardPage"));
const BuilderPage = React.lazy(() => import("../BuilderPage"));

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <ToastComponent />
      <Router>
        {isLoggedInCheck() && <NavigationBar />}
        {isLoggedInCheck() && <Redirect to="/dashboard" />}
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
