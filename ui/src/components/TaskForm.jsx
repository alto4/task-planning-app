import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const TaskForm = ({ selectedTask, setSelectedTask, createTask, updateTask }) => {
  const [formData, setFormData] = useState({ title: '', description: '', category: 'general' });

  const dispatch = useDispatch();

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
    console.log('ui => ', formData);
    console.log('e.target', e.target.value);
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
      category: 'general',
    });
  };

  return (
    <section className='add-task'>
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
          {selectedTask && (
            <button
              type='submit'
              className='btn btn-primary'
              onClick={(e) => {
                setSelectedTask(null);
                setFormData({ title: '', description: '', category: 'general' });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
