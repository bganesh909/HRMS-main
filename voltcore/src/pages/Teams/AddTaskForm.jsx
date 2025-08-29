import React, { useState } from "react";
import "./AddTaskForm.css";

function AddTaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task submitted:', task); // You can replace this with an API call
    alert('Task Added Successfully!');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h3>Create New Task</h3>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
        required
      />
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
