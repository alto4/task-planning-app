import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/layouts/Spinner';
import { getTasks, reset } from '../features/tasks/taskSlice';
import TaskItem from '../components/TaskItem';
import PomodoroTimer from '../components/PomodoroTimer';

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [dailyPomodoros, setDailyPomodoros] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (isError) {
      console.log('Error: ', message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    debugger;
    console.log('daily pomoso updated!');
  }, [dailyPomodoros]);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='dashboard'>
      <section className='overview'>
        <h1>Welcome {user && user.name}</h1>
        <p className='byline'>Productivity Overview</p>
      </section>

      <PomodoroTimer dailyPomodoros={dailyPomodoros} setDailyPomodoros={setDailyPomodoros} />

      <TaskForm selectedTask={selectedTask} setSelectedTask={setSelectedTask} />

      {tasks.length ? (
        tasks.map((task) => <TaskItem key={task._id} task={task} setSelectedTask={setSelectedTask} />)
      ) : (
        <p>There are currently no saved tasks.</p>
      )}
    </div>
  );
};

export default Dashboard;
