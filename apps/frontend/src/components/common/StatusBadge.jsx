'use client';
const STATUS_MAP = { active:'active', approved:'approved', online:'online', delivered:'delivered', done:'done', pending:'pending', invited:'invited', unassigned:'unassigned', review:'review', suspended:'suspended', rejected:'rejected', overdue:'overdue', cancelled:'cancelled', 'in-transit':'in-transit', assigned:'assigned', 'in-progress':'in-progress', maintenance:'maintenance', offline:'offline' };

export default function StatusBadge({ status, size = 'md' }) {
  const key = STATUS_MAP[status] || status;
  const label = status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return <span className={`badge badge--${key}`} style={size === 'sm' ? { fontSize: 11, padding: '1px 8px' } : {}}>{label}</span>;
}
