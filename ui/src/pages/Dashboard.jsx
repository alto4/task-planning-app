import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/layouts/Spinner';
import TaskItem, { TaskTableHeader } from '../components/TaskItem';
import PomodoroTimer from '../components/PomodoroTimer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFetch, API_CONFIG, getConfig } from '../utils/api';
import moment from 'moment';

import PomodoroChart from '../components/layouts/PomodoroChart';
import { useMemo } from 'react';
import OverviewRadialCharts from '../components/OverviewRadialCharts';

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [dailyPomodoros, setDailyPomodoros] = useState(0);
  const [pomodoroRecord, setPomodoroRecord] = useState(null);
  const [pomodoroTask, setPomodoroTask] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

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
          (p) => p.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10)
        );
        if (todaysPomodoroRecord) {
          setDailyPomodoros(todaysPomodoroRecord.count);
          setPomodoroRecord(todaysPomodoroRecord);
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
      select: (res) => res.data?.tasks,
      enabled: !!user?.token,
      default: [],
    },
    user?.token
  );

  const createTask = useMutation(
    async (taskData) => {
      await axios.post(`http://localhost:8000/api/tasks/`, taskData, getConfig(user.token));
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
    console.log('pomorodoRecord => ', pomodoroRecord);
    debugger;
    return await axios.put(
      `http://localhost:8000/api/pomodoros/`,
      {
        count: dailyPomodoros,
        id: pomodoroRecord._id.toString(),
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
    if (newCount) {
      if (dailyPomodoros) {
        await updatePomodoroCount.mutate(newCount);
      } else {
        await createPomodoroRecord.mutate(newCount);
      }
    }
  };

  const updateTaskPomodorosCompleted = () => {
    updateTask.mutate({
      ...pomodoroTask,
      id: pomodoroTask?._id,
      completedPomodoros: pomodoroTask.completedPomodoros ? pomodoroTask.completedPomodoros++ : 1,
      date: new Date().toISOString(),
    });
  };

  const tableData = useMemo(() => {
    const applyFilters = (taskData) => {
      if (filterCategory !== 'all') {
        return taskData.filter((task) => task.category === filterCategory);
      }

      if (filterDate !== 'all') {
        return tasks.filter((task) => {
          let date = new Date();
          if (filterDate === 'today') {
            return moment(task.date).isSame(date, 'day');
          }
          if (filterDate === 'tomorrow') {
            return moment(task.date).isSame(date.setDate(date.getDate() + 1), 'day');
          }
          if (filterDate === 'week') {
            return moment(task.date).isSame(new Date(), 'week');
          }
        });
      }
    };
    if (filterCategory !== 'all' || filterDate !== 'all') {
      return applyFilters(tasks);
    }

    return tasks;
  }, [filterCategory, filterDate, tasks]);

  if (isTaskDataLoading || isPomodoroDataLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='dashboard'>
        <div className='dashboard-left'>
          <h3 className='date subheading'>{moment().format('LLLL').split(', 2022')[0]}</h3>
          {/* Radial Stats Charts */}
          {/* <OverviewRadialCharts pomodoroData={data} taskData={tasks} /> */}
          {/* Productivity Chart */}
          <PomodoroChart chartData={data} />
        </div>

        <div className='dashboard-right'>
          <PomodoroTimer
            dailyPomodoros={dailyPomodoros}
            setDailyPomodoros={setDailyPomodoros}
            handleStoredPomodoros={handleStoredPomodoros}
            updateTaskPomodorosCompleted={updateTaskPomodorosCompleted}
            pomodoroTask={pomodoroTask}
          />
        </div>
      </div>
      <section className='tasks'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className='subheading text-left'>Tasks</h2>
          <div style={{ display: 'flex' }}>
            <button className='btn btn-icon' onClick={() => setShowFilters(!showFilters)}>
              <i className='fa fa-filter'></i>
            </button>
            <button className='btn btn-icon' onClick={() => setShowTaskForm(!showTaskForm)}>
              <i className={`fa fa-${showTaskForm ? 'close' : 'add'}`} />
            </button>
          </div>
        </div>
        {showFilters && (
          <div style={{ display: 'flex' }}>
            <div className='form-group' style={{ width: '160px', margin: 'auto', textAlign: 'center' }}>
              <label style={{ textAlign: 'center' }} for='category'>
                Filter by Category
              </label>
              <select
                type='text'
                style={{ margin: 'auto' }}
                className='form-control'
                id='category'
                name='category'
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value='all'>All Categories</option>
                <option value='chores'>Chores</option>
                <option value='work'>Work</option>
                <option value='coding'>Coding</option>
                <option value='teaching'>Teaching</option>
                <option value='financial'>Financial</option>
                <option value='miscellaneous'>Miscellaneous</option>
              </select>
            </div>
            <div className='form-group' style={{ width: '160px', margin: 'auto', textAlign: 'center' }}>
              <label style={{ textAlign: 'center' }} for='date'>
                Filter by Date
              </label>
              <select
                type='text'
                style={{ margin: 'auto' }}
                className='form-control'
                id='date'
                name='date'
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value='all'>All</option>
                <option value='today'>Today</option>
                <option value='tomorrow'>Tomorrow</option>
                <option value='week'>This Week</option>
              </select>
            </div>
          </div>
        )}
        {/* Task Form: Convert to Modal */}
        <TaskForm
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          createTask={createTask}
          updateTask={updateTask}
          show={showTaskForm}
          setShow={setShowTaskForm}
        />
        <div className='tasks-table'>
          {/* Tasks Overview */}
          <TaskTableHeader />
          {tasks?.length ? (
            tableData.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                setSelectedTask={setSelectedTask}
                setPomodoroTask={setPomodoroTask}
                pomodoroTask={pomodoroTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <p>There are currently no saved tasks.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
