import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';

export default function BarChart() {

  const [options,setOptions] =useState({ 
    chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
    }
  });

  const [series,setSeries] =useState([
    {
      name: 'Series 1',
      data: [],
    },
  ]);

  useEffect(() => {
    const name =[];
    const votes =[];

    axios.get('http://localhost:4000/data').then(response=>{
      console.log("response",response);
      response.data.map(item=>{
        console.log("item",item);
        name.push(item.name)
        votes.push(item.votes)
      })
      setOptions({
        colors:["#7A4D44"],
        chart: {
          id: "Contestants Name"
        },
        xaxis: {
          categories: name,
        }
      })
      setSeries([
        {
          name: 'Number of votes',
          data: votes,
        },
      ])

      console.log("name",name,votes);
    }).catch(e=>{
      alert(e);
    })
  },[]);
  
  return (
    <>
      <Chart
        options={options} series={series} type="bar" height={550}
      />
      <Chart
        options={options} series={series} type="line" height={550}
      />
    </>
  );
}

// line
// area
// bar
// pie
// donut
// radialBar
// scatter
// bubble
// heatmap
// candlestick
// boxPlot
// radar
// polarArea
// rangeBar
// rangeArea
// treemap
