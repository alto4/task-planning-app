import React from 'react';

const toPropercase = (text) => {
  return text
    .split('')
    .map((char, index) => (index ? char : char.toUpperCase()))
    .join('');
  //   return index ? char : char.toUppercase();
  // });
};

export const TaskTableHeader = () => {
  return (
    <div className='task-row table-header'>
      <div className='task-cell'>
        <div className='table-heading text-center'>Status</div>
      </div>
      <div className='task-cell'>
        <div className='table-heading'>Task</div>
      </div>
      <div className='task-cell'>
        <div className='table-heading text-center'>Category</div>
      </div>
      <div className='task-cell'>
        <div className='table-heading text-center'>Actions</div>
      </div>
      <div className='task-cell'>
        <div className='table-heading text-center'>Estimated</div>
      </div>
      <div className='task-cell'>
        <div className='table-heading text-center'>Completed</div>
      </div>
    </div>
  );
};

const TaskItem = ({ task, setSelectedTask, updateTask, deleteTask, setPomodoroTask, pomodoroTask }) => {
  const { title, description, category, estimatedPomodoros, completedPomodoros, completed } = task;

  return (
    <div className='task-row'>
      <div className='task-cell'>
        <input
          className='task-item-status'
          type='checkbox'
          checked={completed ? true : false}
          onChange={(e) => {
            updateTask.mutate({ ...task, id: task._id, completed: e.target.checked });
          }}
          style={{ margin: 'auto' }}
        />
      </div>
      <div className='task-cell task-main'>
        <span className='task-title' style={{ textDecoration: completed ? 'line-through' : 'inherit' }}>
          {title}
        </span>
        <span className='task-description'>{description}</span>
      </div>
      <div className='task-cell text-center'>
        <span className='tag text-center'>{toPropercase(category)}</span>
      </div>
      <div className=' task-cell task-item-buttons'>
        <button className='btn btn-icon' onClick={() => setSelectedTask(task)}>
          <i className='fa fa-pencil'></i>
        </button>
        <button className='btn btn-icon' onClick={() => setPomodoroTask(task)}>
          <i className='fa fa-clock'></i>
        </button>
        <button className='btn btn-icon' onClick={() => deleteTask.mutate(task._id)}>
          <i class='fa fa-trash'></i>
        </button>
      </div>
      <div className='task-cell'>
        <span className='text-center'>{estimatedPomodoros}</span>
      </div>
      <div className='task-cell'>
        <span className='text-center'>{completedPomodoros}</span>
      </div>
    </div>
  );
};

export default TaskItem;
