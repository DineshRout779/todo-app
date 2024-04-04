type TaskListProps = {
  header?: React.ReactNode;
};

const TaskList = ({
  header,
  children,
}: React.PropsWithChildren<TaskListProps>) => {
  return (
    <div>
      {header}
      <ul className="list">{children}</ul>
    </div>
  );
};

export default TaskList;
