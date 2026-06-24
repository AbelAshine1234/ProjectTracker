import { createSlice } from '@reduxjs/toolkit';
import { initialPlatforms } from '@/data/data';

const initialState = {
  items: initialPlatforms,
};

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    updatePlatform(state, action) {
      const idx = state.items.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload };
    },
    addFeature(state, action) {
      const { platformId, feature } = action.payload;
      const platform = state.items.find(p => p.id === platformId);
      if (platform) platform.features.push(feature);
    },
    updateSubTask(state, action) {
      const { platformId, featureId, subTaskId, updates } = action.payload;
      const platform = state.items.find(p => p.id === platformId);
      if (!platform) return;
      const feature = platform.features.find(f => f.id === featureId);
      if (!feature) return;
      const sub = feature.subTasks.find(s => s.id === subTaskId);
      if (sub) Object.assign(sub, updates);
    },
    addSubTask(state, action) {
      const { platformId, featureId, subTask } = action.payload;
      const platform = state.items.find(p => p.id === platformId);
      if (!platform) return;
      const feature = platform.features.find(f => f.id === featureId);
      if (feature) feature.subTasks.push(subTask);
    },
  },
});

export const { updatePlatform, addFeature, updateSubTask, addSubTask } = platformsSlice.actions;
export default platformsSlice.reducer;
