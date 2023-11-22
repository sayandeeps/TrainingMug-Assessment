import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { savedPostsSlice } from "./features/savedPostsSlice";
import likeDislikeReducer from './features/likeDislikeSlice';
import likeDislikephotoReducer from './features/likeDislikephotoSlice';


import {persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
    savedPosts: savedPostsSlice.reducer,
    likeDislike: likeDislikeReducer,
    likeDislikephoto: likeDislikephotoReducer,
  })
   
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;