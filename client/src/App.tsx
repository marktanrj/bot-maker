import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="bg-gray-200">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
