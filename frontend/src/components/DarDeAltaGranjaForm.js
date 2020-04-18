import React from 'react';

class DarDeAltaGranjaForm extends React.Component {

    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {granja:props.granja}
      }

      componentWillReceiveProps(props) {
          this.setState({granja: props.granja})
      }

      handleChange(event) {
        var newGranja = Object.assign({}, this.state.granja);
        newGranja[event.target.name] = event.target.value;
        this.setState({granja: newGranja});
      }
      estadoInicial(){
        this.setState({granja:{nombre: "",deposito:[],galpone: []}});
      }
      handleSubmit(event){
        fetch(`http://localhost:8888/granja`, {
      method: "POST",
      body: JSON.stringify(this.state.granja),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
        }).then(res => this.props.listado())
          .then(this.estadoInicial);
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={this.state.nombre} onChange={this.handleChange}/>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

  export default DarDeAltaGranjaForm