'use client';
import { useSelector } from 'react-redux';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '@/components/data/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import Button from '@/components/common/Button';

export default function BugsPage() {
  const bugs = useSelector(s => s.bugs.items);

  const columns = [
    { label: 'BUG TITLE', key: 'title', render: (val) => <span style={{ fontWeight: 500 }}>{val}</span> },
    { label: 'PLATFORM', key: 'platform' },
    { label: 'REPORTED', key: 'createdAt' },
    { label: 'ATTACHMENTS', key: 'attachments', render: (val) => val.length ? `${val.length} files` : 'None' },
    { label: 'STATUS', key: 'status', render: (val) => <StatusBadge status={val} /> },
    { label: 'ACTIONS', key: 'actions', render: () => <Button variant="outlined" size="sm">View Log</Button> }
  ];

  return (
    <div>
      <PageHeader title="Active Bug Reports" actions={<Button variant="danger">+ Report Bug</Button>} />
      <DataTable columns={columns} rows={bugs} />
    </div>
  );
}
