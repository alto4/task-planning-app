import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/layouts/Spinner';
import { getTasks, reset } from '../features/tasks/taskSlice';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='dashboard'>
      <section className='overview'>
        <h1>Welcome {user && user.name}</h1>
        <p className='byline'>Productivity Overview</p>
      </section>

      <TaskForm />

      {tasks.length && tasks.map((task) => <TaskItem key={task._id} task={task} />)}
    </div>
  );
};

export default Dashboard;
