import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import type { Task } from "../../types";
import Button from "../Button/Button";

export type TaskListItemProps = {
  onUpdate: ({
    taskId,
    updates,
  }: {
    taskId: string;
    updates: Partial<Task>;
  }) => void;
  onDelete: (taskId: string) => void;
} & Task;

type TaskFormFields = {
  title: string;
  description: string;
};

const TasksListItem = ({
  id,
  title,
  completed,
  description,
  onUpdate,
  onDelete,
}: TaskListItemProps) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
    watch,
  } = useForm<TaskFormFields>({
    defaultValues: {
      title: title,
      description: description,
    },
  });

  useEffect(() => {
    reset({
      title: title,
      description: description,
    });
  }, [title, description]);

  const onTaskUpdate: SubmitHandler<TaskFormFields> = (data) => {
    onUpdate({ taskId: id, updates: data });
  };

  const handleCheck = () => {
    onUpdate({ taskId: id, updates: { completed: !completed } });
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const taskTitle = watch("title");
  const isDisabled = !isDirty || !taskTitle.length;

  return (
    <li className="flex gap-4 justify-between py-2 px-4 items-center bg-gray-100 rounded-sm border border-slate-200">
      <form
        className="flex flex-col grow"
        onSubmit={handleSubmit(onTaskUpdate)}
      >
        <input
          className="font-medium text-xl bg-gray-50 mb-1 p-2"
          {...register("title")}
        />
        <TextareaAutosize
          {...register("description")}
          className="bg-gray-50 mb-2 resize-none p-2"
          defaultValue={title}
        />
        <div className="flex gap-4">
          <Button disabled={isDisabled}>Update</Button>
          <Button type="button" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </form>
      <div>
        <input type="checkbox" checked={completed} onChange={handleCheck} />
      </div>
    </li>
  );
};

export default TasksListItem;
