'use client';
export default function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="toggle">
      <div className={`toggle__track ${checked ? 'toggle__track--on' : ''}`} onClick={() => onChange(!checked)}>
        <div className="toggle__knob" />
      </div>
      <div>
        <div className="toggle__label">{label}</div>
        {description && <div style={{ fontSize: 12, color: '#9CA3AF' }}>{description}</div>}
      </div>
    </label>
  );
}
