
import React, { Component } from "react";
import Chart from "react-apexcharts";
class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base:[],
      recolecion:[{
        data:[]
      }],
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
    this.setDatosRecolect = this.setDatosRecolect.bind(this);
  }
  
  componentWillMount() {
    fetch(`http://localhost:8888/recolecion`)
    .then( res => res.json())
    .then( prds => this.setState({base: 
      prds.map(function(recolecion){
        return recolecion.mortalidad
      })}
      ))
    // .then(this.setDatosRecolect);
  }
  setDatosRecolect(){
   const recolecion2 = this.state.recolecion.map(function(recolecion){
      return recolecion.data.concat(this.state.base);
   })
   this.setState({recolecion:recolecion2});

  }
  onClick = () =>{
    // const mortalidad = this.state.recolecion.map(function(recolecion){
    //   return recolecion.mortalidad
    // })
    // this.setState({series:mortalidad})
    this.setDatosRecolect();
    console.log(this.state.recolecion.data);
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