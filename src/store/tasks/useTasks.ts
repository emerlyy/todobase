import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectListById } from "../lists/listsSelectors";
import { selectTasks } from "./tasksSelectors";
import { fetchTasksForList } from "./tasksThunks";

export const useTasks = (listId: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksForList(listId));
  }, [listId, dispatch]);

  const list = useAppSelector(selectListById(listId));
  const tasks = useAppSelector(selectTasks);

  return { list, tasks };
};
