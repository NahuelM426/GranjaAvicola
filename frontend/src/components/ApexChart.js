
import React, { Component } from "react";
import Chart from "react-apexcharts";
class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ]
    };
  }
  componentWillMount() {
    fetch(`http://localhost:8888/recolecion`)     
    .then( res => res.json())     
    .then((prds) =>{
      this.setState({options:
        { 
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: prds.map(function(recolecion)
                   {return recolecion.fecha})       
          }
        }
      });
      this.setState({series:
        [{
          name: "series-1",
          data: prds.map(function(recolecion)
           {return recolecion.cantidadDeHuevos}) 
          }
        ] 
      });  
    })
  }   

   

    setDatosRecolect(){
     this.state.recolecion.data.concat(1);
     console.log(this.state.recolecion.data);
    //  this.setState({recolecion:recolecion2});
    }
 
  onClick = () =>{
    console.log(this.state.base);
  } 

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <h1>Mortalidad </h1>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="800"
            />
            {/* <button onClick={this.onClick}> Hor </button> */}
            <button onClick={this.onClick}> Cargar Datos </button>
            
          </div>
        </div>
      </div>
    );
  }
}
export default ApexChart;