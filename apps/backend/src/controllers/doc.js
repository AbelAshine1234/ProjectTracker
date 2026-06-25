import * as docService from '../services/doc.js';

export async function getByProject(req, res) {
  const pages = await docService.getByProject(Number(req.params.projectId));
  res.json(pages);
}

export async function create(req, res) {
  const page = await docService.create(req.body, req.user);
  res.status(201).json(page);
}

export async function update(req, res) {
  const page = await docService.update(Number(req.params.id), req.body, req.user);
  res.json(page);
}

export async function remove(req, res) {
  await docService.remove(Number(req.params.id));
  res.status(204).end();
}
