'use client';
import NavItem from './NavItem';
import { LayoutDashboard, Users, Bug, ListTodo, Settings } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sidebar__nav">
      <NavItem href="/" icon={LayoutDashboard} label="Dashboard" />
      <NavItem href="/platforms" icon={ListTodo} label="Platforms & Features" />
      <NavItem href="/bugs" icon={Bug} label="Active Bugs" />
      <NavItem href="/users" icon={Users} label="User Management" />
      <NavItem href="/settings" icon={Settings} label="Settings" />
    </nav>
  );
}
