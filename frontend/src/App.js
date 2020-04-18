import React from 'react';
import HomeComponent from './components/HomeComponent'
import Granjas from './components/Granjas'

import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
import './App.css';



function GranjasComponent()  {
  return (<Granjas entity="granja"/>)
}


function App() {
  return (
    <div className="App">
    <Router>
      <header className="App-header">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/granja">Granjas</NavLink></li>
        </ul>
      </header>
      <main className="App-main">
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/granja" component={GranjasComponent} />
            <Redirect to="/" />
          </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;
