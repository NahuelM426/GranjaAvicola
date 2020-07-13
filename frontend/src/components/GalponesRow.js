import React from 'react';
import { Redirect } from "react-router-dom";

class GalponesRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = { redirect: "/" };
        this.selectGalpon = this.selectGalpon.bind(this);
    }
    
    selectGalpon() {
        this.props.selector(this.props.galpon)
    }
    onClick  = () => {
        return <Redirect to={this.state.redirect} />
    }

    render() {      
        return(
            <tr key={this.props.galpon._id} onClick={this.selectGalpon}>
              <td>{this.props.galpon.nombre}</td>
              <td>{this.props.galpon.fechaIngresosAnimales}</td>
              <td>{this.props.galpon.cantidadDeAnimales}</td>
              <td>
              <form>
                <button  onClick={this.onClick}>Home</button>
              </form>
             </td>
            </tr>)
      
    }
}

  export default GalponesRow