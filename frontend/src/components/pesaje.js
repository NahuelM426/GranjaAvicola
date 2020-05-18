
import React, { Component } from "react";
import Chart from "react-apexcharts";
var moment = require('moment');
const { std } = require ( 'mathjs');

class Pesajes extends Component {
  constructor(props) {
    super(props);
    this.randn_bm = this.randn_bm.bind(this);
    this.state = {
      pesaje:{},
      promedio:0,
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
          text:'Pesaje',
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
          data: [
            
          ]
        }
      ]
    }
    ;
  }
  componentWillMount() {
    fetch(`http://localhost:8888/pesaje`)     
    .then( res => res.json())     
    .then( prds =>{
       this.setState({pesaje : prds});

      // var arry = []
      // for (var i = 0; i < 100; i++) {
      //   var numero= this.randn_bm(980,2000,1)
      //    arry.add(numero) ;
      // }
      // this.setState({series:
      //   [{
      //     name: "Galpon-1",
      //     data: prds.map(function(pesaje)
      //     {return pesaje.pesos})
      //     }
      //   ] 
      // });

    })
  }   
  onClick = () =>{

    var b = this.state.pesaje[0];

    console.log("b",b.pesos)
    
    var sumatoria =  b.pesos.reduce((a,b) => a + b,0);
    
    console.log("Suma",sumatoria)
    
    var promedioo = sumatoria / b.pesos.length;

    var desviacionEstandar = std(b.pesos);

    var maximo = b.pesos.reduce(function(a, b) {
      return Math.max(a, b);
    });
    
    var minimo = b.pesos.reduce(function(a, b) {
      return Math.min(a, b);
    });
    console.log("minimo", minimo);

    console.log("maximo", maximo);

    console.log("desviacionEstandar", desviacionEstandar);
   
    console.log("promedio cuenta", promedioo)
   this.setState({promedio:promedioo});
  
  };
  randn_bm(min, max, skew) {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1

    if (num > 1 || num < 0) num = this.randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}
  
  onClickk = () =>{
    var arry = []
    for (var i = 0; i < 100; i++) {
      var numero= this.randn_bm(980,2000,2)
       arry.push(numero) ;
    }
    this.setState({series:
      [{
        name: "Galpon-1",
        data: arry 
        }
      ] 
    });
  
    console.log("array",arry)
    console.log("state",this.state)
  }
//     this.setState({
//     fechas:{
//       ...this.state.options,
//       plotOptions: {
//         ...this.state.fechas.plotOptions,
//       bar:{
//         ...this.state.fechas.plotOptions.bar,
//         horizontal:false
//       }
//       }
//     } 
//   });
   


  render() {
    return (
    <React.Fragment>
          <div class="container-fluid">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height="450"
              width='100%'
            />
          </div>
            <button onClick={this.onClick} className="btn btn-primary"> state </button>
            <button onClick={this.onClickk} className="btn btn-primary"> datos </button>        
    </React.Fragment>
    );
  }
}
export default Pesajes;