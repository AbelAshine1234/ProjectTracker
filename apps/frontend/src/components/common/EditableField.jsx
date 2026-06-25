'use client';
import { useState, useEffect } from 'react';
import { Check, X, Pencil } from 'lucide-react';

export default function EditableField({ value, onSave, editing, type = 'text', options = [], className, label }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [dirty, setDirty] = useState(false);

  // Sync draft when value changes externally (e.g. after save)
  useEffect(() => {
    if (!dirty) setDraft(value);
  }, [value, dirty]);

  if (!editing) return <>{value}</>;

  const handleChange = (newVal) => {
    setDraft(newVal);
    setDirty(true);
  };

  const handleSave = () => {
    if (draft !== value) {
      onSave(draft);
    }
    setDirty(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setDirty(false);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <span className={`editable-field ${className || ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <span className="editable-field__value">{value || <span style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Empty</span>}</span>
        <button 
          onClick={() => setIsEditing(true)} 
          style={{ 
            background: 'none', border: 'none', color: '#593D8F', cursor: 'pointer', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px',
            borderRadius: '4px'
          }}
          title="Edit this field"
        >
          <Pencil size={14} />
        </button>
      </span>
    );
  }

  return (
    <span className={`editable-field editable-field--open ${className || ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {type === 'textarea' ? (
        <textarea
          className="editable-field__input"
          value={draft}
          onChange={e => handleChange(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '8px', border: '1px solid #593D8F', borderRadius: '4px', resize: 'vertical' }}
        />
      ) : type === 'select' ? (
        <select
          className="editable-field__input"
          value={draft}
          onChange={e => handleChange(e.target.value)}
          style={{ padding: '8px', border: '1px solid #593D8F', borderRadius: '4px' }}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          className="editable-field__input"
          value={draft}
          onChange={e => handleChange(e.target.value)}
          style={{ padding: '8px', border: '1px solid #593D8F', borderRadius: '4px' }}
        />
      )}
      
      <span className="editable-field__actions" style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={handleSave} 
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 12px', background: '#593D8F', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
          title="Save changes"
        >
          <Check size={14} /> Save
        </button>
        <button 
          onClick={handleCancel} 
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 12px', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
          title="Cancel editing"
        >
          <X size={14} /> Cancel
        </button>
      </span>
    </span>
  );
}
