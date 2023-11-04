import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUser = createAsyncThunk("auth/fetchUser", async (values) => {
  const { data } = await axios.post("auth/login", values);
  console.log(data);
  return data;
});
export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (values) => {
  const { data } = await axios.post("auth/register", values);
  console.log(data);
  return data;
});

export const getMe = createAsyncThunk("auth/getMe", async () => {
  const { data } = await axios.get("auth/me");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      console.log(state.data);
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.data = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "login ok";
    },
    [fetchUser.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },

    [getMe.pending]: (state, action) => {
      state.data = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "login ok";
    },
    [getMe.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },

    [fetchAuth.pending]: (state, action) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "auth ok ok";
    },
    [fetchAuth.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },
  },
});
export const isAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;
