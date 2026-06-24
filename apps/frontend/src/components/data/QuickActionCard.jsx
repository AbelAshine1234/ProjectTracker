'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function QuickActionCard({ label, description, href }) {
  return (
    <Link href={href} className="quick-action-card">
      <div className="flex justify-between items-center mb-sm">
        <span className="quick-action-card__label">{label}</span>
        <ArrowUpRight size={16} style={{ color: '#9CA3AF' }} />
      </div>
      <span className="quick-action-card__desc">{description}</span>
    </Link>
  );
}
