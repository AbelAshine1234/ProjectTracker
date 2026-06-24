'use client';
export default function FormField({ label, required, hint, error, children }) {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}{required && <span className="form-field__required"> *</span>}</label>
      {children}
      {hint && <span className="text-label">{hint}</span>}
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
