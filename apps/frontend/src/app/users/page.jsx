'use client';
import { useSelector } from 'react-redux';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '@/components/data/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import UserAvatar from '@/components/common/UserAvatar';
import Button from '@/components/common/Button';

export default function UsersPage() {
  const users = useSelector(s => s.users.items);

  const columns = [
    { label: 'USER', key: 'username', render: (val, row) => <UserAvatar name={val} role={row.role} showName size="sm" /> },
    { label: 'SYSTEM ROLE', key: 'role', render: (val) => <StatusBadge status="maintenance" /> }, // using gray badge style
    { label: 'STATUS', key: 'accountStatus', render: (val) => <StatusBadge status={val} /> },
    { label: 'ACTIONS', key: 'actions', render: (val, row) => (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="ghost" size="sm">Edit</Button>
        {row.accountStatus === 'active' ? (
          <Button variant="danger" size="sm">Disable</Button>
        ) : (
          <Button variant="primary" size="sm">Enable</Button>
        )}
      </div>
    ) }
  ];

  return (
    <div>
      <PageHeader title="User Management" actions={<Button>+ Create User</Button>} />
      <DataTable columns={columns} rows={users} />
    </div>
  );
}
