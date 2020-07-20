import React from 'react';

class GranjaRow extends React.Component {

    constructor(props) {
        super(props);
        this.selectGranja = this.selectGranja.bind(this);
    }
    
    selectGranja() {
        this.props.selector(this.props.granja)
    }

    render() {      
        return(
            <tr key={this.props.granja._id} onClick={this.selectGranja}>
            <td>{this.props.granja._id}</td> 
            <td>{this.props.granja.nombre}</td>
            </tr>
            )
      
    }
}

  export default GranjaRow