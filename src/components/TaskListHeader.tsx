type TaskListHeaderProps = {
  count: number;
};

export default function TaskListHeader({ count }: TaskListHeaderProps) {
  return <h4>Total Tasks ({count})</h4>;
}
