'use client';
import { Package } from 'lucide-react';
export default function EmptyState({ icon: Icon = Package, title, description }) {
  return (
    <div className="empty-state">
      <Icon className="empty-state__icon" size={48} strokeWidth={1} />
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__desc">{description}</p>
    </div>
  );
}
