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

export default function PageComments({ activeSection }) {
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
    <section className="page-comments">
      <div className="page-comments__header">
        <MessageSquare size={16} />
        <span>Comments ({comments.length})</span>
      </div>

      <div className="page-comments__list">
        {comments.length === 0 && (
          <p className="page-comments__empty">No comments yet for this page.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="page-comment">
            <div className="page-comment__header">
              <span className="page-comment__author">{c.author}</span>
              {c.role && <span className="page-comment__role">{c.role}</span>}
              <span className="page-comment__time">{c.timestamp}</span>
            </div>
            <p className="page-comment__text">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="page-comments__form">
        <input
          className="page-comments__input"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="page-comments__send" onClick={addComment} disabled={!text.trim()}>
          <Send size={15} />
        </button>
      </div>
    </section>
  );
}
