import React from 'react';

const TaskItem = ({ task, setSelectedTask, updateTask, deleteTask, setPomodoroTask, pomodoroTask }) => {
  const { title, description, estimatedPomodoros, completedPomodoros, completed } = task;

  return (
    <div className='task-row'>
      <div className='task-cell' style={{ flexDirection: 'column' }}>
        <h3 style={{ textDecoration: completed ? 'line-through' : 'inherit' }}>{title}</h3>
        {!isNaN(parseInt(description)) && <p>Est. {description} Pomodoros</p>}
      </div>
      <div className='task-cell'>{estimatedPomodoros}</div>

      <div className='task-cell'>{completedPomodoros}</div>

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
        <input
          className='task-item-status'
          type='checkbox'
          checked={completed ? true : false}
          onChange={(e) => {
            console.log('checkbox changed => ', e.target.checked);
            updateTask.mutate({ ...task, id: task._id, completed: e.target.checked });
          }}
        />
      </div>
    </div>
  );
};

export default TaskItem;
