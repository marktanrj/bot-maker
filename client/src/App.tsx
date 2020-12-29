import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ToastComponent from "./components/common/ToastComponent";

const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));

function App() {
  return (
    <div className="bg-gray-200">
      <ToastComponent />
      <Router>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" render={() => <Redirect to="/signin" />} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
