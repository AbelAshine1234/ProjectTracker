import { configureStore } from '@reduxjs/toolkit';
import platformsReducer from './slices/platformsSlice';
import usersReducer from './slices/usersSlice';
import bugsReducer from './slices/bugsSlice';
import featuresReducer from './slices/featuresSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    platforms: platformsReducer,
    users: usersReducer,
    bugs: bugsReducer,
    features: featuresReducer,
    ui: uiReducer,
  },
});
