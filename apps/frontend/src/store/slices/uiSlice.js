import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarCollapsed: false,
  activeModal: null,
  modalData: null,
  toast: null,
  searchQuery: '',
  activeFilter: 'all',
  currentUser: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) { state.sidebarCollapsed = !state.sidebarCollapsed; },
    openModal(state, action) { state.activeModal = action.payload.type; state.modalData = action.payload.data || null; },
    closeModal(state) { state.activeModal = null; state.modalData = null; },
    showToast(state, action) { state.toast = action.payload; },
    hideToast(state) { state.toast = null; },
    setSearch(state, action) { state.searchQuery = action.payload; },
    setFilter(state, action) { state.activeFilter = action.payload; },
    login(state, action) { state.currentUser = action.payload; },
    logout(state) { state.currentUser = null; },
  },
});

export const { toggleSidebar, openModal, closeModal, showToast, hideToast, setSearch, setFilter, login, logout } = uiSlice.actions;
export default uiSlice.reducer;
