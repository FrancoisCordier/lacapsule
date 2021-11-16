import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScreenHome from "./ScreenHome";
import ScreenArticlesBySource from "./ScreenArticlesBySource";
import ScreenMyArticles from "./ScreenMyArticles";
import ScreenSource from "./ScreenSource";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ScreenHome} />
        <Route path="/screenmyarticles" component={ScreenMyArticles} />
        <Route
          path="/screenarticlesbysource/:id"
          component={ScreenArticlesBySource}
        />
        <Route path="/screensource" component={ScreenSource} />
      </Switch>
    </Router>
  );
}

export default App;
