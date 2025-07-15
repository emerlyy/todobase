import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  deleteTask,
  getTasksForList,
  updateTask,
} from "../../firebase/tasksApi";
import type { Task } from "../../types";

export const fetchTasksForList = createAsyncThunk(
  "tasks/fetch",
  async (listId: string) => {
    try {
      const tasks = await getTasksForList(listId);
      return tasks;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
);

export const createNewTask = createAsyncThunk(
  "tasks/add",
  async ({
    listId,
    title,
    description,
  }: {
    listId: string;
    title: string;
    description: string;
  }) => {
    try {
      const taskId = await createTask(listId, { title, description });
      return { id: taskId, title, description, completed: false } as Task;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
);

export const updateTaskData = createAsyncThunk(
  "tasks/update",
  async ({
    listId,
    taskId,
    updates,
  }: {
    listId: string;
    taskId: string;
    updates: Partial<Task>;
  }) => {
    try {
      await updateTask(listId, taskId, updates);
      return { taskId, updates };
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
);

export const deleteTaskById = createAsyncThunk(
  "tasks/delete",
  async ({ listId, taskId }: { listId: string; taskId: string }) => {
    try {
      await deleteTask(listId, taskId);
      return taskId;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
);
