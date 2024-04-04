import { useState } from 'react';
import { Task } from './types';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TaskListItem from './components/TaskListItem';
import TaskListHeader from './components/TaskListHeader';

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

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number, updatedTask: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: updatedTask } : task,
      ),
    );
  };

  return (
    <div>
      <h1>Tasks</h1>
      <AddTaskForm onTaskAdd={handleAddTask} />
      <TaskList>
        <TaskListHeader count={tasks.length} />
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </TaskList>
    </div>
  );
};

export default App;
