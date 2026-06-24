import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, title: 'Global System Audit Logs Dashboard', platform: 'BM Admin Panel', platformId: 1, requestedBy: 'Internal Operations', status: 'pending', createdAt: '2026-06-18' },
    { id: 2, title: 'Export CSV Monthly Payout Reports', platform: 'Merchant Panel', platformId: 3, requestedBy: 'Merchant Team', status: 'in-progress', createdAt: '2026-06-15' },
    { id: 3, title: 'Multi-user Role Permission Matrix inside Companies', platform: 'Corporate Panel', platformId: 4, requestedBy: 'Corporate Clients', status: 'pending', createdAt: '2026-06-19' },
    { id: 4, title: 'Driver Earnings Breakdown Screen', platform: 'BM-Driver-ET', platformId: 6, requestedBy: 'Driver Ops', status: 'review', createdAt: '2026-06-10' },
  ],
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    addFeatureRequest(state, action) { state.items.push(action.payload); },
    updateFeatureRequest(state, action) {
      const idx = state.items.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload };
    },
    removeFeatureRequest(state, action) {
      state.items = state.items.filter(f => f.id !== action.payload);
    },
  },
});

export const { addFeatureRequest, updateFeatureRequest, removeFeatureRequest } = featuresSlice.actions;
export default featuresSlice.reducer;
