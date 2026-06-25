import * as statusService from '../services/status.js';

export async function getByProject(req, res) {
  const { type } = req.query;
  const statuses = await statusService.getByProject(Number(req.params.projectId), type);
  res.json(statuses);
}

export async function create(req, res) {
  const status = await statusService.create(req.body);
  res.status(201).json(status);
}

export async function update(req, res) {
  const status = await statusService.update(Number(req.params.id), req.body);
  res.json(status);
}

export async function remove(req, res) {
  await statusService.remove(Number(req.params.id));
  res.status(204).end();
}
