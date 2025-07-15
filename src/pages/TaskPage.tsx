import { useParams } from "react-router";
import CreateTaskForm from "../components/CreateTaskForm/CreateTaskForm";
import ListDetails from "../components/ListDetails/ListDetails";
import TasksList from "../components/TasksList/TasksList";
import { useTasks } from "../store/tasks/useTasks";

type Params = {
  listId: string;
};

const TaskPage = () => {
  const { listId } = useParams<Params>();

  const { list, tasks } = useTasks(listId!);

  if (!list) return <div>No list With Such Id</div>;

  return (
    <div className="p-8">
      <ListDetails initialTitle={list.title} listId={list.id} />
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-4">
          <CreateTaskForm listId={list.id} />
        </div>
        <TasksList listId={list.id} tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskPage;
