import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '@/lib/api';

// ─── Async Thunks ────────────────────────────────────────────

export const loginUser = createAsyncThunk(
  'ui/loginUser',
  async ({ username, password }) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    // Store token in localStorage for subsequent requests
    if (typeof window !== 'undefined' && data.token) {
      localStorage.setItem('token', data.token);
    }
    return data; // { token, user: { id, name, username, role } }
  }
);

export const fetchMe = createAsyncThunk(
  'ui/fetchMe',
  async () => {
    const data = await apiFetch('/auth/me');
    return data;
  }
);

// ─── Slice ───────────────────────────────────────────────────

const initialState = {
  sidebarCollapsed: false,
  activeModal: null,
  modalData: null,
  toast: null,
  searchQuery: '',
  activeFilter: 'all',
  currentUser: null,
  authStatus: 'idle', // idle | loading | succeeded | failed
  authError: null,
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
    logout(state) {
      state.currentUser = null;
      state.authStatus = 'idle';
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    restoreUser(state, action) {
      state.currentUser = action.payload;
      state.authStatus = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.authStatus = 'loading';
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authStatus = 'succeeded';
        state.currentUser = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authStatus = 'failed';
        state.authError = action.error.message;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.authStatus = 'succeeded';
      })
      .addCase(fetchMe.rejected, (state) => {
        state.currentUser = null;
        state.authStatus = 'idle';
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      });
  },
});

export const { toggleSidebar, openModal, closeModal, showToast, hideToast, setSearch, setFilter, login, logout, restoreUser } = uiSlice.actions;
export default uiSlice.reducer;
