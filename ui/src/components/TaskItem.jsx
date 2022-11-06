import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const { title, description, completed } = task;

  return (
    <div className='task-item'>
      <div className='task-item-header'>
        <h2 style={{ textDecoration: completed ? 'line-through' : 'inherit' }}>{title}</h2>
        <div>
          <button className='icon-button' onClick={() => dispatch(deleteTask(task._id))}>
            X
          </button>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default TaskItem;
