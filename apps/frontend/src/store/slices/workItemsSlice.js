import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '@/lib/api';

export const fetchWorkItemsByPlatform = createAsyncThunk(
  'workItems/fetchWorkItemsByPlatform',
  async (platformId) => {
    return await apiFetch(`/work-items/platform/${platformId}`);
  }
);

export const createWorkItem = createAsyncThunk(
  'workItems/createWorkItem',
  async (workItemData) => {
    return await apiFetch('/work-items', {
      method: 'POST',
      body: JSON.stringify(workItemData),
    });
  }
);

export const updateWorkItem = createAsyncThunk(
  'workItems/updateWorkItem',
  async ({ id, ...data }) => {
    return await apiFetch(`/work-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
);

export const deleteWorkItem = createAsyncThunk(
  'workItems/deleteWorkItem',
  async (id) => {
    await apiFetch(`/work-items/${id}`, { method: 'DELETE' });
    return id;
  }
);

const workItemsSlice = createSlice({
  name: 'workItems',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addWorkItem(state, action) { state.items.push(action.payload); },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkItemsByPlatform.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkItemsByPlatform.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchWorkItemsByPlatform.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createWorkItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateWorkItem.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteWorkItem.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export const { addWorkItem } = workItemsSlice.actions;
export default workItemsSlice.reducer;
