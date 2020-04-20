
import React, { Component } from "react";
import Chart from "react-apexcharts";
class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recolecion:[],

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
          data: [1,2,3,4]
        }
      ]
    };
  }
  
  componentWillMount() {
    fetch(`http://localhost:8888/recolecion`)
      .then( res => res.json())
      .then( prds => this.setState({recolecion: prds}));
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="800"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ApexChart;