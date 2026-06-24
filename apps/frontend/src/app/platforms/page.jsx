'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '@/components/data/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import SearchBar from '@/components/common/SearchBar';
import FilterSelect from '@/components/common/FilterSelect';
import Button from '@/components/common/Button';

export default function PlatformsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const platforms = useSelector(s => s.platforms.items);

  const flatFeatures = platforms.flatMap(p => 
    p.features.flatMap(f => 
      f.subTasks.map(st => ({
        id: st.id,
        platformName: p.name,
        featureName: f.name,
        taskName: st.name,
        doneBy: st.doneBy || 'Unassigned',
        status: st.status,
        documented: st.addedToDocs
      }))
    )
  );

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
      <PageHeader title="Platforms & Features" actions={<Button>+ Add Feature</Button>} />
      
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
