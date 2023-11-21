// savedPostsSlice.js

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

export interface SavedPostsState {
  savedPosts: Post[];
}

const initialState: SavedPostsState = {
  savedPosts: [],
};

export const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    savePost: (state, action: PayloadAction<Post>) => {
      state.savedPosts.push(action.payload);
    },
    unsavePost: (state, action: PayloadAction<number>) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const { savePost, unsavePost } = savedPostsSlice.actions;
export default savedPostsSlice.reducer;
