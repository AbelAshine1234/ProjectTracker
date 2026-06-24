import { createSlice } from '@reduxjs/toolkit';
import { initialBugs } from '@/data/data';

const initialState = {
  items: initialBugs,
};

const bugsSlice = createSlice({
  name: 'bugs',
  initialState,
  reducers: {
    addBug(state, action) { state.items.push(action.payload); },
    updateBug(state, action) {
      const idx = state.items.findIndex(b => b.id === action.payload.id);
      if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload };
    },
    removeBug(state, action) {
      state.items = state.items.filter(b => b.id !== action.payload);
    },
  },
});

export const { addBug, updateBug, removeBug } = bugsSlice.actions;
export default bugsSlice.reducer;
