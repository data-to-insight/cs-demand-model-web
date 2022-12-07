import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../features/api/apiSlice';
import viewReducer from '../features/view/viewSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    view: viewReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export default store;

