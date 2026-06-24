'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MessageSquare, X, Send } from 'lucide-react';

const STORAGE_KEY = 'bm-doc-comments';

function loadComments() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveComments(all) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export default function CommentPanel({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const currentUser = useSelector(s => s.ui.currentUser);

  useEffect(() => {
    const all = loadComments();
    setComments(all[activeSection] || []);
  }, [activeSection]);

  const addComment = () => {
    if (!text.trim() || !currentUser) return;
    const newComment = {
      id: Date.now(),
      author: currentUser.username,
      text: text.trim(),
      timestamp: new Date().toLocaleString(),
    };
    const all = loadComments();
    all[activeSection] = [...(all[activeSection] || []), newComment];
    saveComments(all);
    setComments(all[activeSection]);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  return (
    <>
      {!open && (
        <button className="comment-toggle" onClick={() => setOpen(true)} title="Comments">
          <MessageSquare size={18} />
          <span className="comment-toggle__badge">{comments.length}</span>
        </button>
      )}

      <aside className={`comment-panel ${open ? 'comment-panel--open' : ''}`}>
        <div className="comment-panel__header">
          <h3 className="comment-panel__title">Comments</h3>
          {currentUser && (
            <span className="comment-panel__user">{currentUser.username}</span>
          )}
          <button className="comment-panel__close" onClick={() => setOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="comment-panel__list">
          {comments.length === 0 && (
            <p className="comment-panel__empty">No comments yet for this section.</p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <div className="comment-item__header">
                <span className="comment-item__author">{c.author}</span>
                <span className="comment-item__time">{c.timestamp}</span>
              </div>
              <p className="comment-item__text">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="comment-panel__form">
          <div className="comment-panel__input-row">
            <input
              className="comment-panel__input comment-panel__input--text"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!currentUser}
            />
            <button className="comment-panel__send" onClick={addComment} disabled={!text.trim() || !currentUser}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
