'use client';
const COLORS = ['#1A5C32','#DC2626','#3B82F6','#F59E0B','#8B5CF6','#EC4899','#06B6D4','#F97316'];
function hashName(name) { let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h); return Math.abs(h); }
function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

export default function UserAvatar({ name, role, size = 'md', showName = false, showLogout = false, onLogout }) {
  const bg = COLORS[hashName(name) % COLORS.length];
  return (
    <div className="avatar-block">
      <div className={`avatar avatar--${size}`} style={{ background: bg }}>{getInitials(name)}</div>
      {showName && (
        <div className="avatar-block__info">
          <span className="avatar-block__name">{name}</span>
          {role && <span className="avatar-block__role">{role}</span>}
        </div>
      )}
      {showLogout && <button onClick={onLogout} className="btn btn--ghost btn--sm" style={{ marginLeft: 'auto' }}>↗</button>}
    </div>
  );
}
