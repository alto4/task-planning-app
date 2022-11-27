import React, { useState } from 'react';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const TaskForm = ({ selectedTask, setSelectedTask, createTask, updateTask, show, setShow }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedPomodoros: 1,
    category: 'general',
    date: new Date(),
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        category: selectedTask.category,
        date: selectedTask.date ? new Date(selectedTask.date) : new Date(),
      });
      setShow(true);
    }
  }, [selectedTask, setShow]);
  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

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
    setShow(false);
  };

  return (
    <section className='add-task modal-background'>
      {show && (
        <div className='modal-content'>
          <form onSubmit={onSubmit} className='form task-form'>
            <div className='form-header'>
              <h3>{selectedTask ? 'Edit Task' : 'Create a New Task'}</h3>
              <button
                className='btn btn-icon'
                onClick={() => {
                  setShow(false);
                  setSelectedTask(null);
                  setFormData({ title: '', description: '', category: 'general' });
                }}
              >
                <i className='fa fa-close fa-lg'></i>
              </button>
            </div>
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
              >
                <option value='chores'>Chores</option>
                <option value='work'>Work</option>
                <option value='coding'>Coding</option>
                <option value='teaching'>Teaching</option>
                <option value='financial'>Financial</option>
                <option value='miscellaneous'>Miscellaneous</option>
              </select>
            </div>
            <div className='form-group'>
              <label for='date'>Date</label>
              <DatePicker
                selected={formData.date}
                name={'date'}
                onChange={(date, e) => {
                  setFormData((prevState) => ({ ...prevState, date: date }));
                }}
              />
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
        </div>
      )}
    </section>
  );
};

export default TaskForm;
