import { createSlice } from '@reduxjs/toolkit';
import { initialUsers } from '@/data/data';

const initialState = {
  items: initialUsers,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action) { state.items.push(action.payload); },
    updateUser(state, action) {
      const idx = state.items.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload };
    },
    toggleUserStatus(state, action) {
      const user = state.items.find(u => u.id === action.payload);
      if (user) user.accountStatus = user.accountStatus === 'active' ? 'suspended' : 'active';
    },
    removeUser(state, action) {
      state.items = state.items.filter(u => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, toggleUserStatus, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
