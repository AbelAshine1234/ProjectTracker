'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/store/slices/uiSlice';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const users = useSelector(s => s.users.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Invalid username or password');
      return;
    }

    if (user.accountStatus !== 'active') {
      setError('Account is suspended. Contact an administrator.');
      return;
    }

    dispatch(login({ id: user.id, username: user.username, role: user.role }));
    router.push('/');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <h1 className="login-card__title">BM Ecosystem</h1>
          <p className="login-card__subtitle">Sign in to your account</p>
        </div>

        <form className="login-card__form" onSubmit={handleSubmit}>
          {error && <div className="login-card__error">{error}</div>}

          <div className="login-card__field">
            <label className="login-card__label">Username</label>
            <input
              className="login-card__input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="login-card__field">
            <label className="login-card__label">Password</label>
            <input
              className="login-card__input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-card__btn" type="submit" disabled={!username || !password}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
