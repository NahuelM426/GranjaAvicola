
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
            categories: prds.map(function(recolecion){
            const data = recolecion.fecha
            return data;
          })       
          }
        }
      });
      this.setState({series:
        [{
          name: "Galpon-1",
          data: prds.map(function(recolecion)
           {return recolecion.mortalidad}) 
          }
        ] 
      });  
    })
  }   
  onClick = () =>{
    console.log(this.state);
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
              width="400"
            />
            <button onClick={this.onClick}> Cargar Datos </button>
            
          </div>
        </div>
      </div>
    );
  }
}
export default ApexChart;