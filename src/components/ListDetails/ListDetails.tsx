import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { deleteListById, updateListData } from "../../store/lists/listsThunks";
import Button from "../Button/Button";

type Props = {
  initialTitle: string;
  listId: string;
};

const ListDetails = ({ initialTitle, listId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
    watch,
  } = useForm<{ listTitle: string }>({
    defaultValues: {
      listTitle: initialTitle,
    },
  });

  useEffect(() => {
    reset({ listTitle: initialTitle });
  }, [initialTitle]);

  const dispatch = useAppDispatch();

  const onListRename: SubmitHandler<{ listTitle: string }> = (data) => {
    dispatch(
      updateListData({ listId: listId, updates: { title: data.listTitle } })
    );
  };

  const navigate = useNavigate();

  const deleteList = async () => {
    await dispatch(deleteListById(listId));
    navigate("/");
  };

  const listTitle = watch("listTitle");
  const isDisabled = !isDirty || !listTitle.length;

  return (
    <form
      className="flex flex-col gap-4 mb-8"
      onSubmit={handleSubmit(onListRename)}
    >
      <input
        className="font-medium text-3xl bg-gray-100 px-2 py-1 rounded-sm"
        autoComplete="off"
        {...register("listTitle", { required: true })}
      />
      <div className="flex gap-4">
        <Button className="w-40" disabled={isDisabled}>
          Change Name
        </Button>
        <Button className="w-40" onClick={deleteList} type="button">
          Delete List
        </Button>
      </div>
    </form>
  );
};

export default ListDetails;
