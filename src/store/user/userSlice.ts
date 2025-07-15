import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  token: string | null;
  displayName: string | null;
  id: string | null;
  isAuthLoading: boolean;
}

const initialState: UserState = {
  email: null,
  token: null,
  displayName: null,
  id: null,
  isAuthLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        email: string;
        token: string;
        displayName: string;
        id: string;
      }>
    ) => {
      const { displayName, email, id, token } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.id = id;
      state.token = token;
      state.isAuthLoading = false;
    },
    removeUser: (state) => {
      state.displayName = null;
      state.email = null;
      state.id = null;
      state.token = null;
      state.isAuthLoading = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
