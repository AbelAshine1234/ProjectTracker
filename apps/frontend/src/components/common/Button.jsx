'use client';
export default function Button({ children, variant = 'primary', size, disabled, onClick, type = 'button', ...props }) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}`;
  return <button className={cls} disabled={disabled} onClick={onClick} type={type} {...props}>{children}</button>;
}
