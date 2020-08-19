import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Photo from "./Pages/Photo/Photo";
import Topbar from "./Components/Topbar/Topbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Video from "./Pages/Video/Video";
import Pagination from "./Components/Pagination/Pagination";
import Example from "./Pages/Example";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Photo} />
          <Route exact path="/video" component={Video} />
          <Route exact path="/paginate" component={Example} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
