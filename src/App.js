
import React, { Component } from "react";
import {BrowserRouter as Router ,Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Addsub from  "./Components/Addsub";
import Sub from "./Components/Sub";
import Sublist from "./Components/Sublist";


class App extends Component{
render(){
return(
  <Router>
  <div>
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" className="navbar-brand">
      Jot-down
    </a>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/subscriptions"} className="nav-link">
         Subscriptions
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/add"} className="nav-link">
          Add
        </Link>
      </li>
    </div>
  </nav>
  <div className="container mt-3">
          <Switch>
            <Route exact path={["/","/subscriptions"]} component={Sublist} />
            <Route exact path="/add" component={Addsub} />
            <Route path="/subscriptions/:id" component={Sub} />
          </Switch>
        </div>
      </div>
      </Router>
);
}
}
  
export default App;
