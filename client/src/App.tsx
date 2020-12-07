import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="bg-gray-200">
      <Router>
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
