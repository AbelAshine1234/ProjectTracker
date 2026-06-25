import { createSlice } from '@reduxjs/toolkit';

const editDataSlice = createSlice({
  name: 'editData',
  initialState: { customPlatforms: [] },
  reducers: {
    saveEdit(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    addDocPlatform(state, action) {
      state.customPlatforms.push(action.payload);
    },
  },
});

export const { saveEdit, addDocPlatform } = editDataSlice.actions;
export default editDataSlice.reducer;
