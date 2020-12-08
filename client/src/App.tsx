import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));

function App() {
  return (
    <div className="bg-gray-200">
      <Router>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={SignInPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
