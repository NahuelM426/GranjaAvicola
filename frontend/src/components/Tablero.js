import React from 'react';
import Select from 'react-select'
import Pesaje from './Pesaje'
import Apex from './ApexChart'


class Tablero extends React.Component {
    constructor() {
        super();
        this.state = { 
            pesos:{},
            recoleccion:{},
            selectedOption: null,
            galpon:[],
            todosLosPesos:[],
            galpones: [],
            selected:{},
            fechas:{},
            graficos:true
        }
        this.idGalpon = this.idGalpon.bind(this);
      }

      componentDidMount() {
        fetch(`http://localhost:8888/galpones`)     
        .then( res => res.json())     
        .then( prds =>{
          this.setState({galpon:prds[0]},console.log("galpon",this.state))
          this.setState({galpones: prds});
          this.setState({nombreGalpon:prds.map(function(prds){
            const nombre = prds.nombre
            const nombre2 = {label:nombre};
            return nombre2;
            })
          });
         
          
        })

      }
    
      handleChangeGalpon = selectedOption => {
        this.setState({selectedOption},this.idGalpon);
        this.setState({graficos:true})
      };
      idGalpon = () => {
        console.log("state",this.state)
        const resultado = this.state.galpones.find( galpones => galpones.nombre === this.state.selectedOption.label);
        console.log("resultado",resultado)
        this.setState({galpon:resultado},this.ultimoPesoCargado);
       
        this.setState({selectedOption:null})
      }
      
      render() {
        const { selectedOption } = this.state;
        return (
        <React.Fragment>
        <div class="container">
          <div class="row align-items-start">
              <div class="col-8">
                <Select
                  placeholder = {"Selec Galpon"}
                  value={selectedOption}
                  onChange={this.handleChangeGalpon}
                  options={this.state.nombreGalpon}
                />
              </div>
            </div>
            <div style={ {margin :"8px"}} >
                <div>{this.state.graficos !== false ? (
                    <div>
                      <h1>{this.state.galpon.nombre}</h1>
                    <div>
                        <Pesaje 
                            galpon={this.state.galpon}
                            // pesos = {this.ultimoPesoCargado}
                       />
                    </div>
                    <div>
                        <Apex
                            galpon={this.state.galpon}
                            recoleccion = {this.ultimoRecoleccion}
                        />
                    </div>
                    </div>
                ):true}
                </div>   
            </div>
        </div>
        </React.Fragment>
        );
    }
    
}
export default Tablero