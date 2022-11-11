import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/layouts/Spinner';
import TaskItem from '../components/TaskItem';
import PomodoroTimer from '../components/PomodoroTimer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFetch, API_CONFIG, getConfig } from '../utils/api';

import PomodoroChart from '../components/layouts/PomodoroChart';

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [dailyPomodoros, setDailyPomodoros] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const { data, isLoading: isPomodoroDataLoading } = useFetch(
    ['pomodoroLogs', dailyPomodoros],
    'http://localhost:8000/api/pomodoros',
    {
      onSuccess: (res) => {
        let todaysPomodoroRecord = res.data.pomodoros?.find(
          (p) => p.date.slice(0, 10) === new Date().toISOString().slice(0, 10)
        );
        if (todaysPomodoroRecord) {
          setDailyPomodoros(todaysPomodoroRecord.count);
        }
      },
      enabled: !!user?.token,
    },
    user?.token
  );

  const { data: tasks, isLoading: isTaskDataLoading } = useFetch(
    ['tasks'],
    'http://localhost:8000/api/tasks',
    {
      onSuccess: (res) => {
        console.log('taskData res => ', res);
      },
      select: (res) => res.data?.tasks,
      enabled: !!user?.token,
      default: [],
    },
    user?.token
  );

  const createTask = useMutation(
    async (taskData) => {
      let res = await axios.post(`http://localhost:8000/api/tasks/`, taskData, getConfig(user.token));
      console.log('res => ', res);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  const updateTask = useMutation(
    async (taskData) => {
      return await axios.put(`http://localhost:8000/api/tasks/${taskData.id}`, taskData, getConfig(user.token));
    },
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  const deleteTask = useMutation(
    async (id) => {
      return await axios.delete(`http://localhost:8000/api/tasks/${id}`, getConfig(user.token));
    },
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  const updatePomodoroCount = useMutation(async (dailyPomodoros) => {
    return await axios.put(
      `http://localhost:8000/api/pomodoros/`,
      {
        count: dailyPomodoros,
        date: new Date().toISOString().slice(0, 10),
      },
      getConfig(user.token)
    );
  });

  const createPomodoroRecord = useMutation(async (dailyPomodoros) => {
    return await axios.post(
      `http://localhost:8000/api/pomodoros/`,
      {
        count: dailyPomodoros,
        date: new Date().toISOString().slice(0, 10),
      },
      getConfig(user.token)
    );
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  const handleStoredPomodoros = async (newCount) => {
    debugger;
    if (newCount) {
      if (newCount === 1) {
        await createPomodoroRecord.mutate(newCount);
      } else {
        await updatePomodoroCount.mutate(newCount);
      }
    }
  };

  if (isTaskDataLoading || isPomodoroDataLoading) {
    return <Spinner />;
  }

  return (
    <div className='dashboard'>
      <div className='dashboard-left'>
        <h3 className='date'>November 7, 2022</h3>
        {/* Productivity Chart */}
        <PomodoroChart chartData={data} />

        {/* Task Form: Convert to Modal */}
        <TaskForm
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          createTask={createTask}
          updateTask={updateTask}
        />

        {/* Tasks Overview */}
        {tasks?.length ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              setSelectedTask={setSelectedTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <p>There are currently no saved tasks.</p>
        )}
      </div>
      <div className='dashboard-right'>
        <PomodoroTimer
          dailyPomodoros={dailyPomodoros}
          setDailyPomodoros={setDailyPomodoros}
          handleStoredPomodoros={handleStoredPomodoros}
        />
      </div>
    </div>
  );
};

export default Dashboard;
