// savedPostsSlice.js

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
    albumId: number;
    id: number;
    title: string;
    body: string;
    url: string;
    thumbnailUrl: string;
  }

export interface SavedPhotoState {
  savedPhoto: Post[];
}

const initialState: SavedPhotoState = {
  savedPhoto: [],
};

export const savedPhotoSlice = createSlice({
  name: "savedPhoto",
  initialState,
  reducers: {
    savePhoto: (state, action: PayloadAction<Post>) => {
      state.savedPhoto.push(action.payload);
    },
    unsavePhoto: (state, action: PayloadAction<number>) => {
      state.savedPhoto = state.savedPhoto.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const { savePhoto, unsavePhoto } = savedPhotoSlice.actions;
export default savedPhotoSlice.reducer;
