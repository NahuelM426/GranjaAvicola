import React from 'react';
import GalponesRow from "./GalponesRow"

class Galpones extends React.Component {
    constructor() {
      super();
      this.state = { galpones: [], selected:{}}
      this.select = this.select.bind(this);
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




    renderRows() {
        return this.state.galpones.map((unGalpon, index) => {
          return (
            <GalponesRow 
            galpon={unGalpon} 
            selector={this.select} 
            />
          );
        })
      }
    select(unGalpon) {
        this.setState({selected:unGalpon})
        console.log("galpon",this.state)
    }
}
export default Galpones    