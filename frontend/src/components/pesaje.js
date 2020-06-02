
import React, { Component } from "react";
import Chart from "react-apexcharts";
import image from "../img/gallina.jpg"

class Pesajes extends Component {
  constructor(props) {
    super(props);
    this.round_to_precision = this.round_to_precision.bind(this);
    this.recorerArray = this.recorerArray.bind(this);
    this.grafico = this.grafico.bind(this);
    this.state = {
      pesaje:{},
      pesos:{},
      contandor:0,
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
        stroke: {
          curve: 'smooth'
        },
        title:{
          text:'Uniformidad',
          align:'left',
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
     
  componentDidMount() {
    fetch(`http://localhost:8888/pesaje`)     
    .then( res => res.json())     
    .then( prds =>{
       this.setState({pesos : prds},this.grafico);
    })
  }
  round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
  recorerArray(x){
  var contador = x;
  var peso = this.state.pesos[0].pesos[contador];
  return (peso);
  }
  sumar(numeros){
    var suma = 0;
    numeros.forEach (function(numero){
        suma += numero;
    }); 
    console.log("%",suma);
    return suma;
  }
  fechas(){
    this.state.pesos.map(function(p){
      return p.fecha;
    })
  }
  
  grafico = () =>{
    let n = 100;
    let pesos = this.state.pesos[0].pesos
    let step = 20;
    let max = Math.max(...pesos);
    let min = Math.min(...pesos);
    let data2 = {};

    let sum = pesos.reduce((previous, current) => current += previous);
    let avg = sum / pesos.length;
    
    var promedio = this.round_to_precision(avg,step);
   
    var number = promedio;
    var percentToGet = 10;
    var a = (1 + percentToGet/ 100 ) * number;
    var b = (1- percentToGet / 100) * number;

    var menos10 = this.round_to_precision(a,step);
    var mas10 = this.round_to_precision(b,step);

    


    for (var i = min; i <= max; i+=step) {
      data2[i] = 0;
    }

    for (var i = 0; i < n; i++){ 
      var numero = this.recorerArray(i);
      let rounded = this.round_to_precision(numero, step);
      data2[rounded]++;
    }


    let tipo = [];
    let valor = [];
    let valorBajoPeso = [];
    let valoresEnRango = [];
    let valorSobrePeso = [];
    let valorMin = [];
    let valorMax = [];
    
    for (const [key, val] of Object.entries(data2)) {
      if((key == min)){
        valorMin.push(val);
      };
    }
    for (const [key, val] of Object.entries(data2)) {
      if((key == max)){
        valorMax.push(val);
      };
    }
    let maxVal = valorMax.pop(0);
    let minVal = valorMin.pop(0);



    console.log("minValor",minVal);
    console.log("maxValor",maxVal);
    for (const [key, val] of Object.entries(data2)) {
      if((key < mas10)){
        valorBajoPeso.push(val);
      };
    }

    for (const [key, val] of Object.entries(data2)) {
      if((key > menos10)){
        valorSobrePeso.push(val);
      };
    }


    console.log("valor",valorBajoPeso);
     for (const [key, val] of Object.entries(data2)) {
      if((key<= menos10 && key >=mas10)){
        valoresEnRango.push(val);
      }; 
    }

    for (const [key, val] of Object.entries(data2)) {
      valor.push(val);
      tipo.push(key);
    }
    var totalDeGallinas = pesos.length;

    var totalSobrePeso = valorSobrePeso.reduce((a,b) => a + b,0);
    var porcentanjeSobrePesos = (100 / totalDeGallinas)*totalSobrePeso;
    var redondeoDeSobrePesos =this.round_to_precision(porcentanjeSobrePesos,1);
   
    console.log("SobreTotalGallinas",totalSobrePeso);
    console.log("SobreTotalProcenaje",porcentanjeSobrePesos);
    console.log("sobrePorcentaje",redondeoDeSobrePesos);

    var totalBajoPeso = valorBajoPeso.reduce((a,b) => a + b,0);
    var porcentanjeBajoPesos = (100 / totalDeGallinas)*totalBajoPeso;
    var redondeoDeBajoPesos =this.round_to_precision(porcentanjeBajoPesos,1);
    console.log("bajoTotal",totalBajoPeso);
    console.log("bajoTotalPorcentaje",porcentanjeBajoPesos);
    console.log("bajoRedondeo",redondeoDeBajoPesos);
    var totalDelRango = valoresEnRango.reduce((a, b) => a + b, 0);
    var porcentanje = (100 / totalDeGallinas)*totalDelRango;
    var redondeoDeUniformidad =this.round_to_precision(porcentanje,1)


    this.setState({options:
      { 
        chart: {
          id: "basic-bar"
        },
        annotations: {
          yaxis: [{
            y: '8',
            label: {
              borderColor: '#02A20E',
              style: {
                color: '#000000',
                background: '#02A20E',
              },
              text: 'Uniformidad '+redondeoDeUniformidad+ '%',
            }
          },{
            y: '7',
            label: {
              borderColor: '#EE2626',
              style: {
                color: '#000000',
                background: '#EE2626',
              },
              text: 'Bajo Peso '+redondeoDeBajoPesos+'%',
            }
          },{
            y: '6',
            label: {
              borderColor: '#EE2626',
              style: {
                color: '#000000',
                background: '#EE2626',
              },
              text: 'Sobre Peso '+redondeoDeSobrePesos+'%',
            }
          }
        ],
         xaxis: [{
          x: '' + menos10 + '',
          strokeDashArray: 0,
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#cf3000',
            },
            text: '-10%',
          }
         },
         {
          x: '' + mas10 + '',
          strokeDashArray: 0,
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#4a5b00',
            },
            text: '+10%',
          }
         },
          {
            x: '' + promedio + '',
            strokeDashArray: 0,
            borderColor: '#775DD0',
            label: {
              borderColor: '#775DD0',
              style: {
                color: '#fff',
                background: '#203c00',
              },
              text: 'Promedio',
            }
          },
          {
          x:'' + mas10 + '',
          x2: '' + menos10 + '',
          fillColor: '#1e7f00',
          opacity: 0.4,
          label: {
            borderColor: '#1e7f00',
            style: {
              fontSize: '10px',
              color: '#fff',
              background: '#1e7f00',
            },
            offsetY: -10,
          }

        }],
        points: [{
          x: '' + max + '',
          y: '' + maxVal + '',
          marker: {
            size: 4
          },
          image: {
            path: '' + image + ''
          }
        },{
          x: '' + min + '',
          y: '' + minVal + '',
          marker: {
            size: 4
          },
          image: {
            path: '' + image + ''
          }
        }
      ]
      },
      xaxis: {
        categories: tipo
      }
      }
    });
    this.setState({series:
      [
        {
          name: "Galpon-1",
          data: valor
        }
      ] 
    });
  }
  onClick = () =>{
    this.fechas();
    console.log("fechas",this.fechas());
  }
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
    </React.Fragment>
    );
  }
}
export default Pesajes;