import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { createNewTask } from "../../store/tasks/tasksThunks";
import Button from "../Button/Button";
import Input from "../Input/Input";

type CreateTaskFormProps = {
  listId: string;
};

type TaskFormInputs = {
  title: string;
  description: string;
};

const CreateTaskForm = ({ listId }: CreateTaskFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInputs>();

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    dispatch(
      createNewTask({
        listId,
        title: data.title,
        description: data.description || "",
      })
    );
  };

  return (
    <form
      className="w-120 flex flex-col gap-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="font-medium text-2xl"> Create task</h3>
      <Input
        label="Task title"
        placeholder="Call the client"
        {...register("title", { required: "Required" })}
        errorMessage={errors.title?.message}
      />
      <Input
        label="Task description"
        placeholder=" Prepare a summary for the management by Friday"
        {...register("description")}
      />
      <Button>Create Task</Button>
    </form>
  );
};

export default CreateTaskForm;
