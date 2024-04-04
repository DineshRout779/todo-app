import { useState } from 'react';
import { Task } from '../types';

type TaskListItemProps = {
  task: Task;
  onEdit: (id: number, newTask: string) => void;
  onDelete: (id: number) => void;
};

const TaskListItem = ({ task, onEdit, onDelete }: TaskListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.title);

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    if (!newTask.trim().length) {
      return;
    }

    onEdit(id, newTask);
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <form onSubmit={(e) => handleEdit(e, task.id)}>
          <li>
            <input
              name="editInput"
              title="editInput"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </li>
          <button type="submit" className="save">
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="cancel"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <li>{task.title}</li>
          <button onClick={() => setIsEditing(true)} className="edit">
            Edit
          </button>
          <button onClick={() => onDelete(task.id)} className="delete">
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TaskListItem;
