import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const DEFUALT_POMODORO_SECONDS = 19 * 60;

const PomodoroTimer = ({ dailyPomodoros, setDailyPomodoros, handleStoredPomodoros }) => {
  const [mode, setMode] = useState('stopped');

  const [timeRemaining, setTimeRemaining] = useState(DEFUALT_POMODORO_SECONDS);

  const resetPomodoro = () => {
    setDailyPomodoros((prevPomodoros) => prevPomodoros + 1);
    setMode('break');
    setTimeRemaining(DEFUALT_POMODORO_SECONDS);
  };

  useEffect(() => {
    let id;
    if (mode === 'focus') {
      id = setInterval(() => {
        if (timeRemaining) {
          setTimeRemaining((prevTime) => prevTime - 1);
        }
      }, 1000);
      console.log('time remaining => ', timeRemaining);
      if (timeRemaining === 0) {
        handleStoredPomodoros(dailyPomodoros + 1);
        resetPomodoro();
      }
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [timeRemaining, mode, setDailyPomodoros]);

  return (
    <div>
      <h1>Pomodoro Timer</h1>
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
      <span>
        {timeRemaining && (mode === 'focus' || mode === 'paused') ? (
          <>
            {(timeRemaining / 60).toFixed(2).split('.')[0]}:{timeRemaining % 60 < 10 && '0'}
            {timeRemaining % 60}
          </>
        ) : (
          <>Pomodoro Complete</>
        )}
      </span>
      <p>{dailyPomodoros} Completed Today</p>
    </div>
  );
};

export default PomodoroTimer;
