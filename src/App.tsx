import { useState } from 'react';
import { Task } from './types';
import AddTaskForm from './components/AddTaskForm';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: string) => {
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        title: task,
        isCompleted: false,
      },
    ]);
  };

  console.log('rendered');

  return (
    <div>
      <h1>Tasks</h1>
      <AddTaskForm onTaskAdd={handleAddTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
