import * as authService from '../services/auth.js';

export async function register(req, res) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Username or email already taken' });
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const result = await authService.login(req.body);
    if (!result) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function me(req, res) {
  try {
    const profile = await authService.getProfile(req.user.id);
    if (!profile) return res.status(404).json({ error: 'User not found' });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await authService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const result = await authService.register(req.body); // reuse register
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function toggleUserStatus(req, res) {
  try {
    const user = await authService.toggleStatus(Number(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    await authService.deleteUser(Number(req.params.id));
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
