import { createSlice } from "@reduxjs/toolkit";

import type { FetchStatus, List } from "../../types";
import {
  createNewList,
  deleteListById,
  fetchLists,
  updateListData,
} from "./listsThunks";

interface ListsState {
  lists: List[];
  status: FetchStatus;
  error: string | null;
}

const initialState: ListsState = {
  lists: [],
  status: "idle",
  error: null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.fulfilled, (state, action) => {
        const lists = action.payload;
        if (lists) {
          state.lists = lists;
        }
      })
      .addCase(createNewList.fulfilled, (state, action) => {
        const list = action.payload;
        if (list) {
          state.lists.push(list);
        }
      })
      .addCase(updateListData.fulfilled, (state, action) => {
        const { listId, updates } = action.payload!;
        const list = state.lists?.find((l) => l.id === listId);
        if (list) Object.assign(list, updates);
      })
      .addCase(deleteListById.fulfilled, (state, action) => {
        const listId = action.payload;
        state.lists = state.lists.filter((t) => t.id !== listId) || [];
      });
  },
});

const listsReducer = listsSlice.reducer;
export default listsReducer;
