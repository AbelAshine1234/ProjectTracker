'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '@/store/slices/uiSlice';
import { Gift } from 'lucide-react';

export default function SuccessToast() {
  const dispatch = useDispatch();
  const toast = useSelector(s => s.ui.toast);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => dispatch(hideToast()), 2000); return () => clearTimeout(t); }
  }, [toast, dispatch]);
  if (!toast) return null;
  return (
    <div className="toast-container">
      <div className="toast">
        <Gift className="toast__icon" size={40} />
        <p className="toast__msg">{toast}</p>
      </div>
    </div>
  );
}
