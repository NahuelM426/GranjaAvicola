import React from 'react';

class registrarPesaje extends React.Component{
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            pesaje:[]
        };
    }
    componentWillMount() {
        fetch(`http://localhost:8888/pesaje`)     
        .then( res => res.json())     
        .then( prds =>{
           this.setState({pesaje : prds});      
    
        })
      }   
      handleChange(event) {
        var newGranja = Object.assign({}, this.state.pesaje);
        newGranja[event.target.name] = event.target.value;
        this.setState({pesaje: newGranja});
      }
      estadoInicial(){
        this.setState({fecha: "",pesos: []});
      }
      handleSubmit(event){
        fetch(`http://localhost:8888/pesaje`, {
      method: "POST",
      body: JSON.stringify(this.state.pesaje),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
        })
          .then(this.estadoInicial);
      }

      onClick = () =>{
        console.log("state",this.state.pesaje)
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>Fecha:</label>
            <input type="date"  value={this.state.fecha} onChange={this.handleChange}/>
            <input type="submit" value="Submit" />
            <button onClick={this.onClick} className="btn btn-primary"> state </button>
          </form>
        );
      }
}
    export default registrarPesaje