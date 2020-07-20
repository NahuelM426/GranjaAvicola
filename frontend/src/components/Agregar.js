import React from 'react';

class Agregar extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
          galpon:props.galpon,
        };
        this.estadoInicial = this.estadoInicial.bind(this);
      }
      

      componentWillReceiveProps(props) {
          this.setState({galpon: props.galpon},console.log("state",this.state))
      }
      
      

      handleChange =(event)=> {
        var newGalpon = Object.assign({}, this.state.galpon);
        newGalpon[event.target.name] = event.target.value;

        console.log("newGalpon",newGalpon)
        this.setState({galpon: newGalpon});
      }
      estadoInicial(){
        this.setState({ galpon:{ nombre: "", cantidadDeAnimales: "", fechas:""}});
      }
     
     
      handleSubmit =(event)=> {
        if (this.state.galpon._id) {
          this.editarGalpon();
        } else {
          this.agregarGalpon();
        }
        event.preventDefault();
      }
      editarGalpon =()=> {
        fetch('http://localhost:8888/galpones', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.galpon)
        })
          .then(this.estadoInicial);

      }
      agregarGalpon() {
        console.log("galpon",this.state)
        fetch(`http://localhost:8888/galpones`, {
      method: "POST",
      body: JSON.stringify(this.state.galpon),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
        })
          .then(this.estadoInicial);
      }
   
    
      render() {
        return (
          <div style={{ textAlign: "center" }}> 
          <form class="margen-superior">
            <div class="col-6">
           <label class="sr-only" >Fecha</label>      
                    <div>
                        <input type="text" 
                            class="form-control" 
                            placeholder="Nombre..."
                            name="nombre"
                            value={this.state.galpon.nombre} 
                            onChange={this.handleChange}
                        />
                    </div>
            </div> 
           <div class="col-6">
           <label class="sr-only" >Fecha</label>      
                    <div>
                        <input type="datetime-local" 
                            class="form-control" 
                            placeholder="Fecha..."
                            name="fechaIngresosAnimales"
                            value={this.state.galpon.fechaIngresosAnimales} 
                            onChange={this.handleChange}
                        />
                    </div>
            </div> 
           <div class="col-6">
           <label class="sr-only" >Cantidad De Animales</label>      
                    <div>
                        <input type="number" 
                            class="form-control" 
                            placeholder="Cantidad..."
                            name="cantidadDeAnimales"
                            value={this.state.galpon.cantidadDeAnimales} 
                            onChange={this.handleChange}
                        />
                    </div>
            </div> 
            <button  class="btn btn-outline-success" style={ {margin :"5px"}} onClick={this.handleSubmit}>Listo</button>
          </form>
        </div>
        );
      }
     
    
}

  export default Agregar