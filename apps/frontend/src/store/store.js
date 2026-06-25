import { configureStore } from '@reduxjs/toolkit';
import platformsReducer from './slices/platformsSlice';
import usersReducer from './slices/usersSlice';
import bugsReducer from './slices/bugsSlice';
import featuresReducer from './slices/featuresSlice';
import uiReducer from './slices/uiSlice';
import editDataReducer from './slices/editDataSlice';
import qaReducer from './slices/qaSlice';
import workItemsReducer from './slices/workItemsSlice';
import projectReducer from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    platforms: platformsReducer,
    users: usersReducer,
    bugs: bugsReducer,
    features: featuresReducer,
    ui: uiReducer,
    editData: editDataReducer,
    qa: qaReducer,
    workItems: workItemsReducer,
    project: projectReducer,
  },
});
