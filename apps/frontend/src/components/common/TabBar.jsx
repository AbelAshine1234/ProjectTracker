'use client';
export default function TabBar({ tabs, activeTab, onTabChange, variant = 'pill' }) {
  return (
    <div className={`tab-bar tab-bar--${variant}`}>
      {tabs.map(t => (
        <button key={t.value} className={`tab-bar__item ${t.value === activeTab ? 'tab-bar__item--active' : ''}`} onClick={() => onTabChange(t.value)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
