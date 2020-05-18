import React from 'react';
import HomeComponent from './components/HomeComponent'
import Granjas from './components/Granjas'
import ApexChart from './components/ApexChart'
import Pesaje from './components/pesaje'

import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
import './App.css';



function GranjasComponent()  {
  return (<Granjas entity="granja"/>)
}

function EstadisticaComponent(){
  return (<ApexChart entity="ApexChart"/>)
}

function PesajeComponent(){
  return (<Pesaje entity="Pesaje"/>)
}

function App() {
  return (
    <div className="App">
    <Router>
      <header className="App-header">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/granja">Granjas</NavLink></li>
          <li><NavLink to="/ApexChart">Estadistica</NavLink></li>
          <li><NavLink to="/Pesaje">Pesaje</NavLink></li>
        </ul>
      </header>
      <main className="App-main">
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/granja" component={GranjasComponent} />
            <Route path="/ApexChart" component={EstadisticaComponent} />
            <Route path="/Pesaje" component={PesajeComponent} />
            <Redirect to="/" />
          </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;
