import React from 'react';
import HomeComponent from './components/HomeComponent'
import Granjas from './components/Granjas'
import ApexChart from './components/ApexChart'
import Pesaje from './components/Pesaje'
import RegistrarPesaje from './components/RagistrarPesaje'
import Galpones from './components/Galpones'
import Tablero from './components/Tablero'
import RegistrarRecoleccion from './components/RegistrarRecoleccion'


import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
import './App.css';



function GranjasComponent()  {
  return (<Granjas entity="granja"/>)
}
function RegistrarRecoleccionComponent(){
  return (<RegistrarRecoleccion entity="registrarRecoleccion"/>)
}

function TableroComponent()  {
  return (<Tablero entity="Tablero"/>)
}

function GalponesComponent()  {
  return (<Galpones entity="Galpones"/>)
}
function EstadisticaComponent(){
  return (<ApexChart entity="ApexChart"/>)
}

function PesajeComponent(){
  return (<Pesaje entity="Pesaje"/>)
}


function RegistrarPesajeComponent(){
  return (<RegistrarPesaje entity="registrarPesaje"/>)
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
          {/* <li><NavLink to="/Pesaje">Pesaje</NavLink></li> */}
          <li><NavLink to="/registrarPesaje">RegistrarPesos</NavLink></li>
          <li><NavLink to="/registrarRecoleccion">RegistrarRecoleccion</NavLink></li>
          <li><NavLink to="/Galpones">Galpones</NavLink></li>
          <li><NavLink to="/Tablero">Tablero</NavLink></li>
        </ul>
      </header>
      <main className="App-main">
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/granja" component={GranjasComponent} />
            <Route path="/ApexChart" component={EstadisticaComponent} />
            {/* <Route path="/Pesaje" component={PesajeComponent} /> */}
            <Route path="/registrarPesaje" component={RegistrarPesajeComponent}/>
            <Route path="/registrarRecoleccion" component={RegistrarRecoleccionComponent}/>
            <Route path="/Galpones" component={GalponesComponent} />
            <Route path="/Tablero" component={TableroComponent} />
            
            <Redirect to="/" />
          </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;
