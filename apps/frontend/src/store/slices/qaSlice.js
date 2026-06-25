import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '@/lib/api';

export const fetchQAByPlatform = createAsyncThunk(
  'qa/fetchQAByPlatform',
  async (platformId) => {
    return await apiFetch(`/qa/platform/${platformId}`);
  }
);

export const createQAStory = createAsyncThunk(
  'qa/createQAStory',
  async (storyData) => {
    return await apiFetch('/qa', {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  }
);

export const updateQAStoryAsync = createAsyncThunk(
  'qa/updateQAStoryAsync',
  async ({ id, ...data }) => {
    return await apiFetch(`/qa/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
);

export const deleteQAStory = createAsyncThunk(
  'qa/deleteQAStory',
  async (id) => {
    await apiFetch(`/qa/${id}`, { method: 'DELETE' });
    return id;
  }
);

const qaSlice = createSlice({
  name: 'qa',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addQAStory(state, action) { state.items.push(action.payload); },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQAByPlatform.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQAByPlatform.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchQAByPlatform.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createQAStory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateQAStoryAsync.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteQAStory.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export const { addQAStory } = qaSlice.actions;
export default qaSlice.reducer;
