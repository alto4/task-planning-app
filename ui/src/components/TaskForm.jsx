import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
  });

  const { title, description, category } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    console.log('ui => ', formData);
    console.log('e.target', e.target.value);
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('form data to submit => ', formData);

    dispatch(createTask(formData));

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
          <input type='text' className='form-control' id='title' name='title' value={title} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label for='description'>Description</label>
          <input
            type='text'
            className='form-control'
            id='description'
            name='description'
            value={description}
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
            value={category}
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
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
