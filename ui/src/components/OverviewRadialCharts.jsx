import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const OverviewRadialCharts = ({ pomodoroData, taskData }) => {
  let todaysPomodoroData = pomodoroData?.data?.pomodoros?.find(
    (p) => p?.createdAt?.slice(0, 10) === new Date().toISOString().slice(0, 10)
  );

  let todaysTaskData = taskData
    // ?.filter((t) => t?.createdAt?.slice(0, 10) === new Date().toISOString().slice(0, 10))
    ?.reduce(
      (current, acc) => {
        return {
          estimatedPomodoros: current.estimatedPomodoros + acc.estimatedPomodoros,
          completedPomodoros: current.completedPomodoros + acc.completedPomodoros,
        };
      },
      { estimatedPomodoros: 0, completedPomodoros: 0 }
    );
  return (
    <>
      <h4>Todays Pomodoro Count</h4>
      <p>{JSON.stringify(todaysPomodoroData)}</p>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: '',
          },
          chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            height: '220px',
          },
          subtitle: {
            text: 'Pomodoros Today',
            align: 'center',
            verticalAlign: 'middle',
            style: {
              textAlign: 'center',
              margin: 'auto',
            },
          },
          series: [
            {
              type: 'pie',
              innerSize: '85%',

              data: [
                {
                  y: todaysPomodoroData.count,
                },
                {
                  y: todaysPomodoroData.count,
                  color: '#e3e3e3',
                },
              ],
            },
          ],
        }}
      />

      <h4>Todays Task Count</h4>
      <p>{JSON.stringify(todaysTaskData)}</p>

      <h4>Focus Time Completed / Estimated Focus Time</h4>
      <p>{JSON.stringify(todaysPomodoroData)}</p>
    </>
  );
};

export default OverviewRadialCharts;
