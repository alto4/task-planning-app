import React, { useState } from 'react';
import { useEffect } from 'react';

const TaskForm = ({ selectedTask, setSelectedTask, createTask, updateTask }) => {
  const [formData, setFormData] = useState({ title: '', description: '', estimatedPomodoros: 1, category: 'general' });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        category: selectedTask.category,
      });
    }
  }, [selectedTask]);
  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    debugger;
    e.preventDefault();
    console.log('form data to submit => ', formData);

    if (selectedTask) {
      updateTask.mutate({ ...formData, id: selectedTask?._id });
      setSelectedTask(null);
    } else {
      createTask.mutate(formData);
    }

    setFormData({
      title: '',
      description: '',
      estimatedPomodoros: 1,
      category: 'general',
    });
  };

  return (
    <section className='add-task'>
      {show ? (
        <form onSubmit={onSubmit} className='form task-form'>
          <div className='form-group'>
            <label for='title'>Task</label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={formData.title}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label for='description'>Description</label>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              value={formData.description}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label for='estimatedPomodoros'>Estimated Pomodoros</label>
            <input
              type='number'
              className='form-control'
              id='estimatedPomodoros'
              name='estimatedPomodoros'
              value={formData.estimatedPomodoros}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label for='category'>Category</label>
            <select
              type='text'
              className='form-control'
              id='category'
              name='category'
              value={formData.category}
              onChange={onChange}
              disabled={true}
            >
              <option value='general'>General</option>
            </select>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={(e) => {
                setSelectedTask(null);
                setShow(false);
                setFormData({ title: '', description: '', category: 'general' });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className='btn btn-add-task btn-icon' onClick={() => setShow(true)}>
          +
        </button>
      )}
    </section>
  );
};

export default TaskForm;
