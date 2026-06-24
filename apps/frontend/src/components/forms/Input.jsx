'use client';
export default function Input({ type = 'text', placeholder, value, onChange, prefix, disabled, ...props }) {
  return (
    <div style={{ position: 'relative' }}>
      {prefix && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>{prefix}</span>}
      <input className="form-input" type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        disabled={disabled} style={prefix ? { paddingLeft: 36 } : {}} {...props} />
    </div>
  );
}
