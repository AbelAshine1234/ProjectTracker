'use client';
export default function InfoGrid({ fields, columns = 2 }) {
  return (
    <div className={`info-grid ${columns === 1 ? 'info-grid--single' : ''}`}>
      {fields.map((f, i) => (
        <div key={i} className="info-grid__item">
          <div className="info-grid__label">{f.label}</div>
          <div className="info-grid__value">{f.value}</div>
        </div>
      ))}
    </div>
  );
}
