import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '@/lib/api';

// ─── Async Thunks ────────────────────────────────────────────

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return await apiFetch('/auth/users');
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData) => {
    return await apiFetch('/auth/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
);

// We keep the old name addUser for compatibility with the component
export const addUser = createUser; 

export const toggleUserStatus = createAsyncThunk(
  'users/toggleUserStatus',
  async (userId) => {
    return await apiFetch(`/auth/users/${userId}/status`, { method: 'PUT' });
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userId) => {
    await apiFetch(`/auth/users/${userId}`, { method: 'DELETE' });
    return userId;
  }
);

// ─── Slice ───────────────────────────────────────────────────

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.push(action.payload.user || action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex(u => u.id === action.payload.id);
        if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload };
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
