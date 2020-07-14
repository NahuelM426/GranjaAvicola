import React from 'react';
import Select from 'react-select'
class registrarRecoleccion extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.agregagregarRecolecionAGalpon=this.agregagregarRecolecionAGalpon.bind(this);
        this.handleChangeGalpon = this.handleChangeGalpon.bind(this);
        this.state = {
            selectedOption: null,
            nombreGalpon:{},
            galpones:{},
            recoleccion:{
                fecha:"",
                cantidadDeHuevos:"",
                mortalidad:""
              }
        }
    }
    handleChangeGalpon = selectedOption => {
        this.setState({selectedOption});
      };
    componentDidMount() {
        fetch(`http://localhost:8888/galpones`)     
        .then( res => res.json())     
        .then( prds =>{
          this.setState({galpones: prds});
          this.setState({nombreGalpon:prds.map(function(prds){
            const nombre = prds.nombre
            const nombre2 = {label:nombre};
            return nombre2;
            })
          });
        })
      }
    estadoInicial = ()=>{
        this.setState({fecha:""});
        this.setState({cantidadDeHuevos:""});
        this.setState({mortalidad:""});
        this.setState({nombreGalpon:{}});
        this.setState({selectedOption: null});
    }
    agregagregarRecolecionAGalpon = (event) => {
        const resultado = this.state.galpones.find( galpones => galpones.nombre === this.state.selectedOption.label);
        console.log("resultado",resultado)
        let _id = resultado._id;
        console.log("acaaaaa" + event);
        console.log("idGalpon",this.state.galpones[0]._id)
        console.log("galpones",this.state.galpones)
        fetch(`http://localhost:8888/galpones/recoleccion/` + _id, {
          method: "PUT",
          body: JSON.stringify(this.state.recoleccion),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(this.estadoInicial())
      }
    handleSubmit =(event)=> {
        this.agregagregarRecolecionAGalpon(event)
        event.preventDefault();
      }
    handleChange =(event)=> {
        var newPesaje = Object.assign({}, this.state.recoleccion);
        newPesaje[event.target.name] = event.target.value;
        console.log("recoleccion",newPesaje)
        this.setState({recoleccion: newPesaje});
      }
      event = (event)=>{
        event.preventDefault()
      }
    render() {
        const { selectedOption } = this.state;
        return (
        <div style={{ textAlign: "center" }}> 
         <div class="row align-items-start">
          <div class="col-10">
            <Select
              placeholder = {"Select Galpon"}
              value={selectedOption}
              onChange={this.handleChangeGalpon}
              options={this.state.nombreGalpon}
            />
          </div>
        </div>       
          <form onSubmit={this.event}>
            <div>
                <label class="sr-only" for="inlineFormInputName2">Fecha</label>      
                    <div>
                        <input type="datetime-local" 
                            class="form-control" 
                            placeholder="Fecha"
                            name="fecha"
                            value={this.state.fecha} 
                            onChange={this.handleChange}
                        />
                    </div>
            </div>
            <div>
                <label class="sr-only" for="inlineFormInputName2">HuevosCantidad</label>      
                    <div>
                        <input type="number" 
                            class="form-control" 
                            placeholder="Cantidad..."
                            name="cantidadDeHuevos"
                            value={this.state.cantidadDeHuevos} 
                            onChange={this.handleChange}
                        />
                    </div>
            </div>
            <div>
                <label class="sr-only" for="inlineFormInputName2">Mortalidad</label>      
                    <div>
                        <input type="number" 
                            class="form-control" 
                            placeholder="Mortalidad..."
                            name="mortalidad"
                            value={this.state.mortalidad} 
                            onChange={this.handleChange}
                        />
                    </div>
            </div>
      <button style={ {margin :"5px"}}class="btn btn-outline-success" onClick={this.handleSubmit}> Listo</button>
    </form>  
    </div>
  );
  }
}
export default registrarRecoleccion