'use client';
import { Search } from 'lucide-react';
export default function SearchBar({ placeholder = 'Search...', value, onChange }) {
  return (
    <div className="search-bar">
      <Search className="search-bar__icon" size={16} />
      <input className="search-bar__input" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
