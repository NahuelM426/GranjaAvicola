import React from 'react';

import RegistrarPesaje from './components/RagistrarPesaje'
import Galpones from './components/Galpones'
import Tablero from './components/Tablero'
import RegistrarRecoleccion from './components/RegistrarRecoleccion'


import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
import './App.css';


function RegistrarRecoleccionComponent(){
  return (<RegistrarRecoleccion entity="registrarRecoleccion"/>)
}

function TableroComponent()  {
  return (<Tablero entity="/"/>)
}

function GalponesComponent()  {
  return (<Galpones entity="Galpones"/>)
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
          <li><NavLink to="/">Tablero</NavLink></li>
          <li><NavLink to="/registrarPesaje">Registrar Pesos</NavLink></li>
          <li><NavLink to="/registrarRecoleccion">Registrar Recolección</NavLink></li>
          <li><NavLink to="/Galpones">Galpones</NavLink></li>
        </ul>
      </header>
      <main className="App-main">
          <Switch>
            <Route path="/" exact component={TableroComponent} />
            <Route path="/registrarPesaje" component={RegistrarPesajeComponent}/>
            <Route path="/registrarRecoleccion" component={RegistrarRecoleccionComponent}/>
            <Route path="/Galpones" component={GalponesComponent} />
            
            <Redirect to="/" />
          </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;
