import { useAppDispatch } from "../../hooks/reduxHooks";
import { deleteTaskById, updateTaskData } from "../../store/tasks/tasksThunks";
import type { Task } from "../../types";
import TasksListItem, {
  type TaskListItemProps,
} from "../TasksListItem/TasksListItem";

type Props = {
  listId: string;
  tasks: Task[];
};

const TasksList = ({ tasks, listId }: Props) => {
  const dispatch = useAppDispatch();

  const handleTaskUpdate: TaskListItemProps["onUpdate"] = ({
    taskId,
    updates,
  }) => {
    dispatch(updateTaskData({ listId, taskId, updates }));
  };

  const handleTaskDelete = (taskId: string) => {
    dispatch(deleteTaskById({ listId, taskId }));
  };

  return (
    <div >
      <h2 className="font-medium text-xl">Tasks:</h2>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TasksListItem
            key={task.id}
            {...task}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
