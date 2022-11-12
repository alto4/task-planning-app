import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// Default timer to standard intervals of 25m focus/5m break
const DEFUALT_POMODORO_SECONDS = 25 * 60;
const DEFAULT_BREAK_MODE_SECONDS = 5 * 60;

const PomodoroTimer = ({
  dailyPomodoros,
  setDailyPomodoros,
  handleStoredPomodoros,
  pomodoroTask,
  updateTaskPomodorosCompleted,
}) => {
  const [mode, setMode] = useState('focus');
  const [timeRemaining, setTimeRemaining] = useState(DEFUALT_POMODORO_SECONDS);

  const resetPomodoro = () => {
    setDailyPomodoros((prevPomodoros) => prevPomodoros + 1);
    setMode('break');
    setTimeRemaining(DEFUALT_POMODORO_SECONDS);
  };

  useEffect(() => {
    if (!mode === 'break') {
      setMode('focus');
    }
  }, [pomodoroTask, mode]);

  useEffect(() => {
    let id;
    debugger;
    if (mode === 'focus' || mode === 'break') {
      debugger;
      id = setInterval(() => {
        if (timeRemaining) {
          setTimeRemaining((prevTime) => prevTime - 1);
        }
      }, 1000);
      console.log('time remaining => ', timeRemaining);
      if (timeRemaining === 0) {
        if (mode === 'focus') {
          handleStoredPomodoros(dailyPomodoros + 1);
          pomodoroTask && updateTaskPomodorosCompleted(pomodoroTask);
          setMode('break');
          setTimeRemaining(DEFAULT_BREAK_MODE_SECONDS);
        }
        if (mode === 'break') {
          resetPomodoro();
        }
      }
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [timeRemaining, mode, setDailyPomodoros]);

  return (
    <div>
      <h2 className='subheading'>Pomodoro Timer</h2>
      <p>{dailyPomodoros} Completed Today</p>

      <span>
        {/* {timeRemaining && (mode === 'focus' || mode === 'paused') ? ( */}
        <>
          <div className='timer-display'>
            {(timeRemaining / 60).toFixed(2).split('.')[0]}:{timeRemaining % 60 < 10 && '0'}
            {timeRemaining % 60}
          </div>
        </>
        <span className='subheading'>{timeRemaining && mode === 'focus' ? 'Time to Focus' : 'Break Time'}</span>
      </span>
      <div className='pomodoro-buttons'>
        {mode === 'focus' ? (
          <button
            className='btn'
            onClick={() => {
              setMode('paused');
            }}
          >
            Pause
          </button>
        ) : (
          <button
            className='btn'
            onClick={() => {
              setMode('focus');
            }}
          >
            Start
          </button>
        )}
        {(mode === 'focus' || mode === 'paused') && (
          <button
            className='btn'
            onClick={() => {
              setMode('stopped');
              setTimeRemaining(DEFUALT_POMODORO_SECONDS);
            }}
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
