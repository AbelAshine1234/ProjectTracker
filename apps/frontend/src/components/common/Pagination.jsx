'use client';
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) pages.push(i);
    else if (pages[pages.length - 1] !== '...') pages.push('...');
  }
  return (
    <div className="pagination">
      <button className="pagination__btn" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>← Prev</button>
      {pages.map((p, i) => p === '...' ? <span key={`e${i}`} style={{ padding: '0 4px', color: '#9CA3AF' }}>...</span> :
        <button key={p} className={`pagination__btn ${p === currentPage ? 'pagination__btn--active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
      )}
      <button className="pagination__btn" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>Next →</button>
    </div>
  );
}
