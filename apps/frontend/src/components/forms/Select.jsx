'use client';
export default function Select({ options, value, onChange, placeholder }) {
  return (
    <select className="form-input form-select" value={value} onChange={e => onChange(e.target.value)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
