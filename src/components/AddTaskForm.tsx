import { useState } from 'react';

type TaskInputProps = {
  onTaskAdd: (task: string) => void;
};

const AddTaskForm = ({ onTaskAdd }: TaskInputProps) => {
  const [task, setTask] = useState('');

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTaskName = task.trim();

    if (!trimmedTaskName) {
      return;
    }

    onTaskAdd(task);
    setTask('');
  };

  return (
    <form onSubmit={handleAddTask}>
      <label htmlFor="todo">Add Task:</label>
      <input
        type="text"
        id="todo"
        placeholder="Add a todo"
        name="todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default AddTaskForm;
