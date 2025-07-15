import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectLists } from "../../store/lists/listsSelectors";
import { createNewList, fetchLists } from "../../store/lists/listsThunks";
import Button from "../Button/Button";
import Input from "../Input/Input";
import ListCard from "../ListCard/ListCard";

type Props = {
  userId: string;
};

const UserLists = ({ userId }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLists(userId));
  }, [dispatch]);

  const lists = useAppSelector(selectLists);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreatelist = () => {
    if (!inputRef.current) return;
    const title = inputRef.current.value || "";
    if (!title) return;
    dispatch(createNewList({ title, ownerId: userId }));
    inputRef.current.value = "";
  };

  return (
    <div className="p-4 border-r-1 border-slate-200 h-full w-80 shrink-0">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="font-medium">Create New List</h2>
        <Input
          ref={inputRef}
          type="text"
          name="title"
          placeholder="list title"
          className="border"
        />
        <Button onClick={handleCreatelist}>Create List</Button>
      </div>
      <ul className="flex flex-col gap-2">
        {lists?.map((list) => (
          <ListCard key={list.id} id={list.id} title={list.title} />
        ))}
      </ul>
    </div>
  );
};

export default UserLists;
