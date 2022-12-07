import {createSlice} from '@reduxjs/toolkit'


export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    currentView: null
  },
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
  },
})

export const selectCurrentView = (state: any) => state.view.currentView
export const { setCurrentView } = viewSlice.actions
export default viewSlice.reducer
