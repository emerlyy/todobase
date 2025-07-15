import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createList,
  deleteList,
  getUserLists,
  updateList,
} from "../../firebase/listsApi";
import type { List } from "../../types";

export const fetchLists = createAsyncThunk(
  "lists/fetch",
  async (userId: string) => {
    try {
      const lists = await getUserLists(userId);
      return lists;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
);

export const createNewList = createAsyncThunk(
  "lists/create",
  async (options: Pick<List, "title" | "ownerId">) => {
    try {
      const listId = await createList(options);
      return { id: listId, ...options } as List;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
);

export const updateListData = createAsyncThunk(
  "lists/update",
  async ({ listId, updates }: { listId: string; updates: Partial<List> }) => {
    try {
      await updateList(listId, updates);
      return { listId, updates };
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
);

export const deleteListById = createAsyncThunk(
  "lists/delete",
  async (id: string) => {
    try {
      await deleteList(id);
      return id;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
);
