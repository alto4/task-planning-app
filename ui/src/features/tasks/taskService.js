import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks/';

const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, taskData, config);

  return res.data;
};

const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL, config);

  return res.data;
};

const taskService = {
  createTask,
  getTasks,
};

export default taskService;
