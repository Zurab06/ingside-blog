import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "/posts/fetchRemovePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    //posts loading
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
      state.posts.items = [];
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = "loaded";
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },

    // tags loading
    [fetchTags.pending]: (state, action) => {
      state.tags.status = "loading";
      state.tags.items = [];
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    //delete post

    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postReducer = postsSlice.reducer;
