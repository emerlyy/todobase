import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./lists/listsSlice";
import tasksReducer from "./tasks/tasksSlice";
import userReducer from "./user/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listsReducer,
    tasks: tasksReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
