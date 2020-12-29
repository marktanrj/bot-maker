import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import ToastComponent from "./components/common/ToastComponent";

const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <ToastComponent />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/signin" />} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
