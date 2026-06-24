'use client';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';
const ICONS = { info: Info, warning: AlertTriangle, success: CheckCircle };
export default function InlineAlert({ type = 'info', message }) {
  const Icon = ICONS[type];
  return <div className={`inline-alert inline-alert--${type}`}><Icon size={16} />{message}</div>;
}
