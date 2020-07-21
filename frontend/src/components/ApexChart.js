
import React, { Component } from "react";
import Chart from "react-apexcharts";
var moment = require('moment');

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base:[],
      recoleccion:{},
      galpon:{},
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
          colors:['#0CA3CF']
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
          name: "",
          data: []
        }
      ],
      seriesT: [],
      optionsT: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      seriesM: [],
      optionsM: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
    ;
  }
  round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
 
  componentWillReceiveProps = (props) => {
    console.log("props",props)
    console.log("recole",props.galpon.recoleccion)
    this.setState({galpon:props.galpon})
    this.setState({recoleccion:props.galpon.recoleccion},this.ultimoRecoleccion)
    // this.graficoMotalidad();
    console.log("state1",this.state)
    this.setState({options:
      { 
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: props.galpon.recoleccion.map(function(recoleccion){
          const data = moment(recoleccion.fecha).format('YYYY-MM-DD')
          return data;
        })       
        }
      }
    });
    this.setState({base:
      [{
        name: props.galpon.nombre,
        data: props.galpon.recoleccion.map(function(recoleccion)
         {return recoleccion.mortalidad}) 
        }
      ]
    });
    this.setState({series:
      [{
        name: props.galpon.nombre,
        data: props.galpon.recoleccion.map(function(recoleccion)
         {return recoleccion.cantidadDeHuevos}) 
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
          categories: props.galpon.recoleccion.map(function(recoleccion){
          const data = moment(recoleccion.fecha).format('DD-MMM-YYYY')
          return data;
        })       
        },
        plotOptions:{
          bar:{
            horizontal:true
          }
        },
        fill:{
          colors:['#0CA3CF']
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
    this.graficoDeRendimiento();
  }
  mapFormatFechaDeRecoleccion(){
    console.log("mapFormaFeaaaaaa",this.state.galpon)
    return this.state.recoleccion.map(function(prds){
        const data = prds.fecha
        console.log("retunr22",data)
        return data;
      });
  }
  ultimoRecoleccion(){
    var dates = this.mapFormatFechaDeRecoleccion();
    console.log("dates",dates)
    let arrayFechas = dates.map((fechaActual) => new Date(fechaActual));
    var max = new Date (Math.max(...arrayFechas));
    const resultado = this.state.recoleccion.find( todosLosPesos => moment (todosLosPesos.fecha).format('DD-MM-YYYY') === ''+moment (max).format('DD-MM-YYYY')+'' );
    console.log("resulnnnnnnnn",resultado);
    console.log("max",moment(max).format('DD-MM-YYYY'))
    this.setState({recoleccion:resultado},this.graficoDeRendimiento);
    this.graficoMotalidad();
    console.log("pesossss",this.state)
    console.log("resull",resultado)
  }

  graficoDeRendimiento=()=>{
    let graficoTor= [];
    var totalDeGallinas = this.state.galpon.cantidadDeAnimales;
    console.log("totalRendim",totalDeGallinas)
    let totalDeHuevos = this.state.recoleccion.cantidadDeHuevos*30;
    console.log("3333",this.state.recoleccion.cantidadDeHuevos)
    let rendimiento = (100 / totalDeGallinas)*totalDeHuevos;

    let sinRendimiento = (100 / totalDeGallinas)*(totalDeGallinas - totalDeHuevos);
    var redondeoDeRendimiento =this.round_to_precision(rendimiento,1);
    var redondeoDeRendimientoNegativo =this.round_to_precision(sinRendimiento,1);

    graficoTor.push(redondeoDeRendimiento,redondeoDeRendimientoNegativo);
    console.log("grafico000000000000000000000000000000",graficoTor)
    this.setState({seriesT: graficoTor,
            optionsT: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Rendimiento','Rendimiento Negativo'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
    }});
    
    console.log("nahue",this.state)
  }   
  sumar(numeros){
    var suma = 0;
    numeros.forEach (function(numero){
        suma += numero;
    }); 
    console.log("%",suma);
    return suma;
  }
  graficoMotalidad=()=>{
    let graficoMart= [];
    var totalDeGallinas = this.state.galpon.cantidadDeAnimales;

    let listaMortalidad =
    this.state.recoleccion.map(function(recoleccion){
      return recoleccion.mortalidad
    })
    console.log("moratlidad",listaMortalidad)
    console.log("moratlidadddd",this.sumar(listaMortalidad.map(Number)))

    console.log("3333",this.state.recoleccion.cantidadDeHuevos)
    let gallinasVivas = (100 / totalDeGallinas)*(totalDeGallinas - this.sumar(listaMortalidad.map(Number)));

    let sinRendimiento = (100 / totalDeGallinas)*this.sumar(listaMortalidad.map(Number));
    var redondeoDeGallinasVivas =this.round_to_precision(gallinasVivas,0.1);
    var redondeoDeGallinasDeceso=this.round_to_precision(sinRendimiento,0.1);

    graficoMart.push(redondeoDeGallinasDeceso,redondeoDeGallinasVivas);
    console.log("grafico000000000000000000000000000000",graficoMart)
    this.setState({seriesM: graficoMart,
            optionsM: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Deceso','Produción'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
    }});
    
    console.log("nahue",this.state)
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
            <h1> Productividad </h1>
            <Chart
             options={this.state.optionsT} 
             series={this.state.seriesT} 
             type="pie" 
             width={500}
            />
            <h1> Mortalidad </h1>
            <Chart
             options={this.state.optionsM} 
             series={this.state.seriesM} 
             type="pie" 
             width={500}
            />
          </div>
          <div class="container-fluid">
            <Chart
              options={this.state.options}
              series={this.state.base}
              type="bar"
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