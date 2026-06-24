'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  return (
    <div className="filter-select">
      <button className="filter-select__btn" onClick={() => setOpen(!open)}>
        {selected?.label || label} <ChevronDown size={14} />
      </button>
      {open && (
        <div className="filter-select__dropdown">
          {options.map(opt => (
            <div key={opt.value} className={`filter-select__option ${opt.value === value ? 'filter-select__option--active' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
