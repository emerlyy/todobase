import { createSlice } from "@reduxjs/toolkit";
import type { FetchStatus, Task } from "../../types";
import {
  createNewTask,
  deleteTaskById,
  fetchTasksForList,
  updateTaskData,
} from "./tasksThunks";

interface TasksState {
  tasks: Task[];
  status: FetchStatus;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksForList.fulfilled, (state, action) => {
        const tasks = action.payload;
        if (tasks) {
          state.tasks = tasks;
        }
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        const task = action.payload;
        if (task) {
          state.tasks.push(task);
        }
      })
      .addCase(updateTaskData.fulfilled, (state, action) => {
        const { taskId, updates } = action.payload!;
        const task = state.tasks?.find((t) => t.id === taskId);
        if (task) Object.assign(task, updates);
      })
      .addCase(deleteTaskById.fulfilled, (state, action) => {
        const taskId = action.payload;
        state.tasks = state.tasks?.filter((t) => t.id !== taskId) || [];
      });
  },
});

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
