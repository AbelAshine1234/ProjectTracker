'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Send, MessageSquare } from 'lucide-react';

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

export default function RightComments({ activeSection }) {
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
      role: currentUser.role,
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

  if (!currentUser) return null;

  return (
    <aside className="doc-right-panel">
      <div className="doc-right-panel__header">
        <MessageSquare size={15} />
        <span>Comments ({comments.length})</span>
      </div>

      <div className="doc-right-panel__list">
        {comments.length === 0 && (
          <p className="doc-right-panel__empty">No comments yet for this page.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="right-comment">
            <div className="right-comment__header">
              <span className="right-comment__author">{c.author}</span>
              <span className="right-comment__time">{c.timestamp}</span>
            </div>
            <p className="right-comment__text">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="doc-right-panel__form">
        <input
          className="doc-right-panel__input"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="doc-right-panel__send" onClick={addComment} disabled={!text.trim()}>
          <Send size={14} />
        </button>
      </div>
    </aside>
  );
}
