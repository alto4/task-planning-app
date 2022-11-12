import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PomodoroChart = ({ chartData }) => {
  console.log('chartData => ', chartData);
  const options = {
    chart: {
      type: 'column',
      backgroundColor: 'rgba(0,0,0,0)',
      height: '350px',
    },
    title: {
      // text: 'Daily Pomodoros & Task Trends',
      text: '',
      style: {
        color: '#EEE',
      },
    },
    yAxis: {
      title: {
        text: 'Pomodoros',
      },
    },
    xAxis: {
      title: {
        text: 'Date',
      },
      categories: chartData?.data?.pomodoros?.map((d) => d.createdAt.slice(0, 10)) ?? [],
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '<b>Daily Record</b><br/>',
      pointFormat: '{point.y} Pomodoros',
    },
    series: [
      {
        data: chartData?.data?.pomodoros?.map((d) => d.count) ?? [],
        color: '#77C7B8',
        label: 'Daily ',
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <div style={{}}>
      {' '}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PomodoroChart;
