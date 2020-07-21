import React from 'react';
import GalponesRow from "./GalponesRow"
import Agregar from "./Agregar"

class Galpones extends React.Component {
    constructor() {
      super();
      this.state = { galpones: [], selected:{}}
      this.select = this.select.bind(this);
      this.listado = this.listado.bind(this);
    }

    componentWillMount(){
        fetch(`http://localhost:8888/galpones`)     
        .then( res => res.json())     
        .then( prds =>{
          this.setState({galpones: prds});
        })
    }
    render() {
        return(
          <div>
           <Agregar 
              galpon={this.state.selected} 
              listado={this.listado}
          />
          <table className="table">
            <thead>
              <tr>
                 <th>Nombre</th>
                 <th>FechaDeIngreso</th>
                 <th>CantidadDeAnimales</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </div>)
      }
      actualizarList(unGalpon) {
        var galpon = this.state.galpones.filter(
          item => unGalpon._id !== item._id
        );
        this.setState({ galpones: galpon });
      }



    renderRows() {
        return this.state.galpones.map((unGalpon, index) => {
          return (
            <GalponesRow 
            galpon={unGalpon} 
            selector={this.select} 
            actualizarList={this.actualizarList}
            />
          );
        })
      }

    select(unGalpon) {
        this.setState({selected:unGalpon})
        console.log("galpon",this.state)
    }
    listado(){
      this.componentWillMount();
    }
}
export default Galpones    