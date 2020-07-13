import React from 'react';
import Select from 'react-select'
import Pesaje from './Pesaje'

var moment = require('moment');

class Tablero extends React.Component {
    constructor() {
        super();
        this.state = { 
            pesos:{},
            selectedOption: null,
            galpon:[],
            todosLosPesos:[],
            galpones: [],
            selected:{},
            fechas:{},
            graficos:false
        }
        this.idGalpon = this.idGalpon.bind(this);
      }

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
      mapFormatFecha(){
        console.log("mapFormaFe",this.state.galpon)
        return this.state.galpon.pesaje.map(function(prds){
            const data = prds.fecha
            console.log("retunr",data)
            return data;
          });
      }
      ultimoPesoCargado(){
        console.log("state ultimoCa",this.state )

        var dates = this.mapFormatFecha();
        console.log("dates",dates)
        let arrayFechas = dates.map((fechaActual) => new Date(fechaActual));
        var max = new Date (Math.max(...arrayFechas));
        const resultado = this.state.galpon.pesaje.find( todosLosPesos => moment (todosLosPesos.fecha).format('DD-MM-YYYY') === ''+moment (max).format('DD-MM-YYYY')+'' );
        console.log("resul",resultado);
        console.log("max",moment(max).format('DD-MM-YYYY'))
    
        this.setState({pesos:[resultado]});
        console.log("pesossss",this.state.pesos)
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
                        <Pesaje 
                            galpon={this.state.galpon}
                            pesos = {this.ultimoPesoCargado}
                       />
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