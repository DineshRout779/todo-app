type TaskListProps = {
  header?: React.ReactNode;
};

const TaskList = ({
  header,
  children,
}: React.PropsWithChildren<TaskListProps>) => {
  return (
    <>
      {header}
      <ul>{children}</ul>
    </>
  );
};

export default TaskList;
