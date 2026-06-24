'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({ icon: Icon, label, href }) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
  return (
    <Link href={href} className={`nav-item ${isActive ? 'nav-item--active' : ''}`}>
      {Icon && <Icon className="nav-item__icon" size={20} strokeWidth={1.5} />}
      <span>{label}</span>
    </Link>
  );
}
