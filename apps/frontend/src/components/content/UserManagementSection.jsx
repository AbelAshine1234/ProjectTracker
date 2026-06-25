'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, removeUser, toggleUserStatus } from '@/store/slices/usersSlice';
import { UserPlus, Shield, ShieldOff, Trash2 } from 'lucide-react';

const ROLES = ['USER', 'ADMIN'];

function Breadcrumb({ items, onSelect }) {
  return (
    <div className="doc-breadcrumb">
      <button className="doc-breadcrumb__home" onClick={() => onSelect && onSelect('overview')}>🏠</button>
      {items.map((item, i) => {
        const label = typeof item === 'string' ? item : item.label;
        const id = typeof item === 'string' ? null : item.id;
        return (
          <span key={i}>
            <span className="doc-breadcrumb__sep">›</span>
            {id ? (
              <button className="doc-breadcrumb__link" onClick={() => onSelect && onSelect(id)}>{label}</button>
            ) : (
              <span className="doc-breadcrumb__current">{label}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function UserManagementSection({ onSelect }) {
  const users = useSelector(s => s.users.items);
  const currentUser = useSelector(s => s.ui.currentUser);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', username: '', password: '', role: 'USER' });
  const createError = useSelector(s => s.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (createError) setShowForm(true);
  }, [createError]);

  const handleCreate = () => {
    if (!form.name || !form.username || !form.password) return;
    dispatch(addUser({ name: form.name, username: form.username, password: form.password, role: form.role }));
    setForm({ name: '', username: '', password: '', role: 'USER' });
    setShowForm(false);
  };

  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[{ label: 'User Management', id: 'user-management' }]} onSelect={onSelect} />
      <div className="doc-section__header-row">
        <h1 className="doc-section__title">User Management</h1>
        <button className="user-mgmt__add-btn" onClick={() => { setShowForm(!showForm); if (showForm) dispatch({ type: 'users/clearError' }); }}>
          <UserPlus size={16} />
          <span>{showForm ? 'Cancel' : 'Create User'}</span>
        </button>
      </div>

      {showForm && (
        <div className="user-mgmt__form">
          <input className="user-mgmt__input" placeholder="Full Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="user-mgmt__input" placeholder="Username" value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })} />
          <input className="user-mgmt__input" type="password" placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} />
          <select className="user-mgmt__input user-mgmt__input--select" value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button className="user-mgmt__submit" onClick={handleCreate} disabled={!form.name || !form.username || !form.password}>
            <span>Create</span>
          </button>
          {createError && <div className="user-mgmt__error">{createError}</div>}
        </div>
      )}

      <div className="user-mgmt__table-wrap">
        <table className="user-mgmt__table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="user-mgmt__row">
                <td>
                  <div className="user-mgmt__user-cell">
                    <div className="user-mgmt__avatar">{user.username.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="user-mgmt__name">{user.username}</div>
                      <div className="user-mgmt__id">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`user-mgmt__role user-mgmt__role--${user.role === 'ADMIN' ? 'admin' : 'user'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`user-mgmt__status user-mgmt__status--${user.accountStatus}`}>
                    {user.accountStatus}
                  </span>
                </td>
                  <td>
                    <div className="user-mgmt__actions">
                      {currentUser && Number(user.id) === Number(currentUser.id) ? (
                        <span style={{ fontSize: 12, color: '#999', fontStyle: 'italic' }}>Current user</span>
                      ) : (
                        <>
                          <button className="user-mgmt__action user-mgmt__action--toggle"
                            onClick={() => dispatch(toggleUserStatus(user.id))}
                            title={user.accountStatus === 'active' ? 'Suspend' : 'Activate'}>
                            {user.accountStatus === 'active' ? <ShieldOff size={14} /> : <Shield size={14} />}
                          </button>
                          <button className="user-mgmt__action user-mgmt__action--delete"
                            onClick={() => { if (confirm(`Delete user "${user.username}"?`)) dispatch(removeUser(user.id)); }} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
