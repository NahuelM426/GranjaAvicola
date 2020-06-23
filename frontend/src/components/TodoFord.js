import React from 'react';
import shortid from 'shortid';
export default class TodoForm extends React.Component{

    state={
        text:''
    }
handleChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    })
}
handleSumit = (event) =>{
    event.preventDefault();
    this.props.onSubmit({
        id: shortid.generate(),
        text: this.state.text,
        complete: false
    });
    this.setState({
        text:''
    });
}
render(){
    return ( 
      <form onSubmit = {this.handleSumit} class="form-inline">
      <input class="form-control"
            name="text"
            type="number"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder = "todos..."
        />
        <button style={ {margin :"10px"}} onClick={this.handleChange} class="btn btn-primary mb-2">Agregar</button>
      </form>
    );
}

}