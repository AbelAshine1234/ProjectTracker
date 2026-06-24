'use client';
export default function PageHeader({ title, actions, showExport, showNotification }) {
  return (
    <div className="page-header">
      <h1 className="text-page-title">{title}</h1>
      <div className="page-header__actions">
        {showExport && <button className="btn btn--outlined btn--sm">Export</button>}
        {showNotification && <button className="btn btn--outlined btn--sm">🔔</button>}
        {actions}
      </div>
    </div>
  );
}
