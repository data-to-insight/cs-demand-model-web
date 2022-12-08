import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../features/api/apiSlice';
import modelReducer from '../features/model/modelSlice';
import viewReducer from '../features/view/viewSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    view: viewReducer,
    model: modelReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export default store;

