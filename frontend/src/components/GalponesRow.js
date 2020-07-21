import React from 'react';

class GalponesRow extends React.Component {

    constructor(props) {
        super(props);
        this.selectGalpon = this.selectGalpon.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.actualizar = this.actualizar.bind(this);
    }
    
    selectGalpon=()=> {
        this.props.selector(this.props.galpon)
    }
    actualizar() {
        this.props.actualizarList(this.props.galpones)
    }
    handleSubmit =(id)=> {
        console.log("id",id)
        fetch(`http://localhost:8888/galpones/` + id, {
            method: "delete",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }).then(this.actualizar);

      }
      event = (event)=>{
        event.preventDefault()
      }

    render() {      
        return(
            <tr key={this.props.galpon._id} onClick={this.selectGalpon}>
              <td class=" list-group-item-success">{this.props.galpon.nombre}</td>
              <td class=" list-group-item-warning" >{this.props.galpon.fechaIngresosAnimales}</td>
              <td class=" list-group-item-warning">{this.props.galpon.cantidadDeAnimales}</td>
              <td class=" list-group-item-primary">
                <form >
                        <button  class="btn btn-outline-danger" onClick={() => {
                            this.handleSubmit(this.props.galpon._id);
                            }}>Eliminar</button>
                </form>
              </td>
            </tr>)
      
    }
}

  export default GalponesRow