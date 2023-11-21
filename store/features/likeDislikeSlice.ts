// slices/likeDislikeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikeDislikeState {
  [postId: number]: {
    likes: number;
    dislikes: number;
  };
}

const initialState: LikeDislikeState = {};

const likeDislikeSlice = createSlice({
  name: 'likeDislike',
  initialState,
  reducers: {
    incrementLikes: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      if (!state[postId]) {
        state[postId] = { likes: 1, dislikes: 0 };
      } else {
        state[postId].likes += 1;
        state[postId].dislikes = 0; // Reset dislikes when a post is liked
      }
    },
    incrementDislikes: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      if (!state[postId]) {
        state[postId] = { likes: 0, dislikes: 1 };
      } else {
        state[postId].dislikes += 1;
        state[postId].likes = 0; // Reset likes when a post is disliked
      }
    },
  },
});

export const { incrementLikes, incrementDislikes } = likeDislikeSlice.actions;

export default likeDislikeSlice.reducer;
