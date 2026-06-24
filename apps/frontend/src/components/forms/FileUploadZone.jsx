'use client';
import { Upload } from 'lucide-react';
export default function FileUploadZone({ label, acceptedFormats = 'JPG, PNG or PDF · Max 5 MB', onUpload }) {
  return (
    <div className="upload-zone" onClick={() => document.getElementById(`upload-${label}`)?.click()}>
      <Upload className="upload-zone__icon" size={40} />
      <p className="upload-zone__text">{label}</p>
      <p className="upload-zone__hint">{acceptedFormats}</p>
      <input id={`upload-${label}`} type="file" style={{ display: 'none' }} onChange={e => onUpload?.(e.target.files[0])} />
    </div>
  );
}
