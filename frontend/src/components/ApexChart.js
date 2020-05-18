
import React, { Component } from "react";
import Chart from "react-apexcharts";
var moment = require('moment');

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base:[],
      fechas:{},
      options: {
        chart: {
          id: "basic-bar",
          foreColor: '#333',
          background:'#f4f4f4'
        },
        xaxis: {
          categories: []
        },
        fill:{
          colors:['#f44336']
        },
        title:{
          text:'Mortalidad',
          align:'center',
          margin:20,
          offsetY:20,
          style:{
            fontSize:'25px'
          }
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ]
    }
    ;
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
            const data = moment(recolecion.fecha).format('YYYY-MM-DD')
            return data;
          })       
          }
        }
      });
      this.setState({base:
        [{
          name: "Galpon-1",
          data: prds.map(function(recolecion)
           {return recolecion.mortalidad}) 
          }
        ]
      });  
      this.setState({series:
        [{
          name: "Galpon-1",
          data: prds.map(function(recolecion)
           {return recolecion.cantidadDeHuevos}) 
          }
        ] 
      });
      this.setState({fechas:
        { 
          chart: {
            id: "basic-bar",
            foreColor: '#333',
            background:'#f4f4f4'
          },
          xaxis: {
            categories: prds.map(function(recolecion){
            const data = moment(recolecion.fecha).format('DD-MMM-YYYY')
            return data;
          })       
          },
          plotOptions:{
            bar:{
              horizontal:true
            }
          },
          fill:{
            colors:['#fd7e14']
          },
          title:{
            text:'Huevos',
            align:'center',
            margin:20,
            offsetY:20,
            style:{
              fontSize:'25px'
            }
          }
        }
            })  
    })
  }   
  onClick = () =>{
    this.setState({
    fechas:{
      ...this.state.options,
      plotOptions: {
        ...this.state.fechas.plotOptions,
      bar:{
        ...this.state.fechas.plotOptions.bar,
        horizontal:false
      }
      }
    } 
  });
  }; 


  render() {
    return (
    <React.Fragment>
          <div class="container-fluid">
            <Chart
              options={this.state.options}
              series={this.state.base}
              type="line"
              height="450"
              width='100%'
            />
          </div>

          <div class="container-fluid">
             <Chart
              options={this.state.fechas}
              series={this.state.series}
              type="bar"
              height="450"
              width='100%'
            />

          </div>
            <button onClick={this.onClick} className="btn btn-primary"> state </button>        
    </React.Fragment>
    );
  }
}
export default ApexChart;