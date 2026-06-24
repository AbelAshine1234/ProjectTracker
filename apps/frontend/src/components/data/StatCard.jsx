'use client';
export default function StatCard({ label, value, delta, deltaType = 'neutral', subtext, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <span className="stat-card__label">{label}</span>
        {Icon && <Icon size={20} style={{ color: '#9CA3AF' }} />}
      </div>
      <div className="stat-card__value">{value}</div>
      {delta && <div className={`stat-card__delta stat-card__delta--${deltaType}`}>{delta}</div>}
      {subtext && <div className="text-label" style={{ marginTop: 4 }}>{subtext}</div>}
    </div>
  );
}
