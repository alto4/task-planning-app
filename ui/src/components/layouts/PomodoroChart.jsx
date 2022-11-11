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
    xAxis: {
      categories: chartData?.data?.pomodoros?.map((d) => d.date.slice(0, 10)) ?? [],
    },
    series: [
      {
        data: chartData?.data?.pomodoros?.map((d) => d.count) ?? [],
        color: '#6464E1',
      },
      {
        data: chartData?.data?.pomodoros?.map((d) => d.count) ?? [],
        color: '#77C7B8',
      },
    ],
  };
  return (
    <div style={{}}>
      {' '}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PomodoroChart;
