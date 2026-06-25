import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '@/lib/api';

export const fetchProjectData = createAsyncThunk(
  'project/fetchProjectData',
  async () => {
    return await apiFetch('/projects/1');
  }
);

export const updateProjectField = createAsyncThunk(
  'project/updateProjectField',
  async ({ field, value }, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    const updated = await apiFetch(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify({ [field]: value }),
    });
    return updated;
  }
);

// Resource Links
export const addResourceLink = createAsyncThunk(
  'project/addResourceLink',
  async (linkData, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    const link = await apiFetch(`/projects/${projectId}/resource-links`, {
      method: 'POST',
      body: JSON.stringify(linkData),
    });
    return link;
  }
);

export const updateResourceLink = createAsyncThunk(
  'project/updateResourceLink',
  async ({ linkId, data }, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    const link = await apiFetch(`/projects/${projectId}/resource-links/${linkId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return link;
  }
);

export const deleteResourceLink = createAsyncThunk(
  'project/deleteResourceLink',
  async (linkId, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    await apiFetch(`/projects/${projectId}/resource-links/${linkId}`, {
      method: 'DELETE',
    });
    return linkId;
  }
);

// Git Repositories
export const addGitRepo = createAsyncThunk(
  'project/addGitRepo',
  async (repoData, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    const repo = await apiFetch(`/projects/${projectId}/git-repos`, {
      method: 'POST',
      body: JSON.stringify(repoData),
    });
    return repo;
  }
);

export const updateGitRepo = createAsyncThunk(
  'project/updateGitRepo',
  async ({ repoId, data }, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    const repo = await apiFetch(`/projects/${projectId}/git-repos/${repoId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return repo;
  }
);

export const deleteGitRepo = createAsyncThunk(
  'project/deleteGitRepo',
  async (repoId, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    await apiFetch(`/projects/${projectId}/git-repos/${repoId}`, {
      method: 'DELETE',
    });
    return repoId;
  }
);

// Supplementary Docs
export const addSupplementaryDoc = createAsyncThunk(
  'project/addSupplementaryDoc',
  async (docData, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    const doc = await apiFetch(`/projects/${projectId}/supplementary-docs`, {
      method: 'POST',
      body: JSON.stringify(docData),
    });
    return doc;
  }
);

export const updateSupplementaryDoc = createAsyncThunk(
  'project/updateSupplementaryDoc',
  async ({ docId, data }, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    const doc = await apiFetch(`/projects/${projectId}/supplementary-docs/${docId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return doc;
  }
);

export const deleteSupplementaryDoc = createAsyncThunk(
  'project/deleteSupplementaryDoc',
  async (docId, { getState }) => {
    const projectId = getState().project.data?.id || 1;
    await apiFetch(`/projects/${projectId}/supplementary-docs/${docId}`, {
      method: 'DELETE',
    });
    return docId;
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProjectField.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // Resource Links
      .addCase(addResourceLink.fulfilled, (state, action) => {
        if (state.data) state.data.resourceLinks = [...(state.data.resourceLinks || []), action.payload];
      })
      .addCase(updateResourceLink.fulfilled, (state, action) => {
        if (state.data) {
          state.data.resourceLinks = (state.data.resourceLinks || []).map(l =>
            l.id === action.payload.id ? action.payload : l
          );
        }
      })
      .addCase(deleteResourceLink.fulfilled, (state, action) => {
        if (state.data) {
          state.data.resourceLinks = (state.data.resourceLinks || []).filter(l => l.id !== action.payload);
        }
      })
      // Git Repos
      .addCase(addGitRepo.fulfilled, (state, action) => {
        if (state.data) state.data.gitRepositories = [...(state.data.gitRepositories || []), action.payload];
      })
      .addCase(updateGitRepo.fulfilled, (state, action) => {
        if (state.data) {
          state.data.gitRepositories = (state.data.gitRepositories || []).map(r =>
            r.id === action.payload.id ? action.payload : r
          );
        }
      })
      .addCase(deleteGitRepo.fulfilled, (state, action) => {
        if (state.data) {
          state.data.gitRepositories = (state.data.gitRepositories || []).filter(r => r.id !== action.payload);
        }
      })
      // Supplementary Docs
      .addCase(addSupplementaryDoc.fulfilled, (state, action) => {
        if (state.data) state.data.supplementaryDocs = [...(state.data.supplementaryDocs || []), action.payload];
      })
      .addCase(updateSupplementaryDoc.fulfilled, (state, action) => {
        if (state.data) {
          state.data.supplementaryDocs = (state.data.supplementaryDocs || []).map(d =>
            d.id === action.payload.id ? action.payload : d
          );
        }
      })
      .addCase(deleteSupplementaryDoc.fulfilled, (state, action) => {
        if (state.data) {
          state.data.supplementaryDocs = (state.data.supplementaryDocs || []).filter(d => d.id !== action.payload);
        }
      });
  },
});

export default projectSlice.reducer;
