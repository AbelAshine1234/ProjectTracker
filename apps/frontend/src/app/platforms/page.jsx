'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlatforms, createPlatform, createFeature } from '@/store/slices/platformsSlice';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '@/components/data/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import SearchBar from '@/components/common/SearchBar';
import FilterSelect from '@/components/common/FilterSelect';
import Button from '@/components/common/Button';

export default function PlatformsPage() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const { items: platforms, status } = useSelector(s => s.platforms);
  const projectId = useSelector(s => s.project.data?.id);
  
  const [showAddPlatform, setShowAddPlatform] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState('');

  const [showAddFeature, setShowAddFeature] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [selectedPlatformId, setSelectedPlatformId] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      if (projectId) dispatch(fetchPlatforms(projectId));
    }
  }, [status, dispatch]);

  const handleAddPlatform = async () => {
    if (!newPlatformName.trim()) return;
    await dispatch(createPlatform({
      projectId,
      name: newPlatformName,
      slug: newPlatformName.toLowerCase().replace(/\s+/g, '-'),
      type: 'web',
      status: 'active',
      description: 'New Platform',
      repoUrl: '',
      figmaUrl: '',
      postmanUrl: '',
      customUrl: '',
      order: platforms.length,
    }));
    setNewPlatformName('');
    setShowAddPlatform(false);
  };

  const handleAddFeature = async () => {
    if (!newFeatureName.trim() || !selectedPlatformId) return;
    await dispatch(createFeature({
      projectId,
      platformId: Number(selectedPlatformId),
      title: newFeatureName,
      description: 'New feature',
      order: 0,
    }));
    setNewFeatureName('');
    setShowAddFeature(false);
  };

  const flatFeatures = platforms.flatMap(p => {
    if (!p.features || p.features.length === 0) {
      return [{
        id: `p-${p.id}`,
        platformName: p.name,
        featureName: '-',
        taskName: '-',
        doneBy: '-',
        status: p.status,
        documented: false
      }];
    }
    return p.features.flatMap(f => {
      if (!f.subTasks || f.subTasks.length === 0) {
        return [{
          id: `f-${f.id}`,
          platformName: p.name,
          featureName: f.title || f.name,
          taskName: '-',
          doneBy: '-',
          status: 'pending',
          documented: false
        }];
      }
      return f.subTasks.map(st => ({
        id: st.id,
        platformName: p.name,
        featureName: f.title || f.name,
        taskName: st.title || st.name,
        doneBy: st.doneBy || 'Unassigned',
        status: st.status?.name || st.status || 'pending',
        documented: st.addedToDocs
      }));
    });
  });

  const filtered = flatFeatures.filter(f => 
    (filter === 'all' || f.status === filter) &&
    (f.taskName.toLowerCase().includes(search.toLowerCase()) || f.platformName.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    { label: 'PLATFORM', key: 'platformName', render: (val) => <span className="font-medium">{val}</span> },
    { label: 'FEATURE', key: 'featureName' },
    { label: 'TASK', key: 'taskName' },
    { label: 'ASSIGNEE', key: 'doneBy' },
    { label: 'DOCS', key: 'documented', render: (val) => <StatusBadge status={val ? 'done' : 'pending'} size="sm" /> },
    { label: 'STATUS', key: 'status', render: (val) => <StatusBadge status={val} /> },
    { label: 'ACTIONS', key: 'actions', render: () => <Button variant="ghost" size="sm">Edit</Button> }
  ];

  return (
    <div>
      <PageHeader 
        title="Platforms & Features" 
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button onClick={() => setShowAddPlatform(true)}>+ Add Platform</Button>
            <Button onClick={() => setShowAddFeature(true)}>+ Add Feature</Button>
          </div>
        } 
      />
      
      {showAddPlatform && (
        <div style={{ background: 'white', borderRadius: 12, padding: 16, marginBottom: 16, display: 'flex', gap: '8px' }}>
          <input 
            style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            value={newPlatformName} 
            onChange={(e) => setNewPlatformName(e.target.value)} 
            placeholder="Platform Name"
          />
          <Button onClick={handleAddPlatform}>Save Platform</Button>
          <Button variant="ghost" onClick={() => setShowAddPlatform(false)}>Cancel</Button>
        </div>
      )}

      {showAddFeature && (
        <div style={{ background: 'white', borderRadius: 12, padding: 16, marginBottom: 16, display: 'flex', gap: '8px' }}>
          <select 
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            value={selectedPlatformId}
            onChange={(e) => setSelectedPlatformId(e.target.value)}
          >
            <option value="">Select Platform...</option>
            {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input 
            style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            value={newFeatureName} 
            onChange={(e) => setNewFeatureName(e.target.value)} 
            placeholder="Feature Name"
          />
          <Button onClick={handleAddFeature}>Save Feature</Button>
          <Button variant="ghost" onClick={() => setShowAddFeature(false)}>Cancel</Button>
        </div>
      )}

      <div className="table-toolbar mb-lg" style={{ background: 'white', borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <SearchBar placeholder="Search tasks or platforms..." value={search} onChange={setSearch} />
        <FilterSelect label="All Status" value={filter} onChange={setFilter} options={[
          { label: 'All Status', value: 'all' },
          { label: 'Done', value: 'done' },
          { label: 'In Progress', value: 'in-progress' },
          { label: 'Review', value: 'review' },
          { label: 'Pending', value: 'pending' },
        ]} />
      </div>

      <DataTable columns={columns} rows={filtered} />
    </div>
  );
}
