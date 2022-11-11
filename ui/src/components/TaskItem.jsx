import React from 'react';

const TaskItem = ({ task, setSelectedTask, updateTask, deleteTask }) => {
  const { title, description, completed } = task;

  return (
    <div className='task-item'>
      <div className='task-item-header'>
        <h2 style={{ textDecoration: completed ? 'line-through' : 'inherit' }}>{title}</h2>
        <input
          className='task-item-status'
          type='checkbox'
          checked={completed ? true : false}
          onChange={(e) => {
            console.log('checkbox changed => ', e.target.checked);
            updateTask.mutate({ ...task, id: task._id, completed: e.target.checked });
          }}
        />
        <div className='task-item-buttons'>
          <button className='btn btn-icon' onClick={() => setSelectedTask(task)}>
            <i className='fa fa-pencil'></i>
          </button>
          <button className='btn btn-icon' onClick={() => setSelectedTask(task)}>
            <i className='fa fa-clock'></i>
          </button>
          <button className='btn btn-icon' onClick={() => deleteTask.mutate(task._id)}>
            <i class='fa fa-trash'></i>
          </button>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default TaskItem;
