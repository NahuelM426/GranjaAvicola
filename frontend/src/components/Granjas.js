import React from 'react';
import GranjaRow from './GranjaRow';
import DarDeAltaGranjaForm from './DarDeAltaGranjaForm';

class Granjas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { granja: [], selected:{}}
    this.select = this.select.bind(this);
    this.granjaChange = this.granjaChange.bind(this);
    this.listado = this.listado.bind(this);
  }

  componentWillMount() {
    fetch(`http://localhost:8888/granja`)
      .then( res => res.json())
      .then( prds => this.setState({granja: prds}));
  }

    render() {

      if( this.state.granja.length > 0 ) {
        return(
          <div className="productosCSS">
              <h2>{this.props.titulo}</h2>
          
          <table className="table">
            <thead>
              <tr>
                 <th>id</th>
                 <th>nombre</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
          <DarDeAltaGranjaForm 
          granja={this.state.selected} 
          granjaChange={this.granjaChange} 
          listado = {this.listado} 
          />
        </div>)
      }
      else {
        return(
          <div className="productosCSS">
            <DarDeAltaGranjaForm 
            granja={this.state.selected} 
            granjaChange={this.granjaChange} 
            listado = {this.listado}
            />
          </div>);  
      }

    }

    select(unaGranja) {
      this.setState({selected:unaGranja })
    }

    granjaChange(unaGranja) {
      var newGranjas = this.state.granja.map((item) => (unaGranja._id !== item._id) ? item : unaGranja )
      this.setState({granja: newGranjas, selected:unaGranja})
    }

    renderRows() {
      return this.state.granja.map((unaGranja, index) => {
        return (
          <GranjaRow 
          granja={unaGranja} 
          selector={this.select} 
          />
        );
      })
    }
    listado(){
      this.componentWillMount();
    }
  
  }

  export default Granjas