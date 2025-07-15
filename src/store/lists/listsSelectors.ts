import type { RootState } from "../store";

export const selectLists = (state: RootState) => state.lists.lists;
export const selectListById = (id: string) => (state: RootState) =>
  state.lists.lists.find((list) => list.id === id);
