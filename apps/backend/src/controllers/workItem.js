import * as workItemService from '../services/workItem.js';

export async function getByPlatform(req, res) {
  const items = await workItemService.getByPlatform(Number(req.params.platformId));
  res.json(items);
}

export async function create(req, res) {
  const item = await workItemService.create(req.body);
  res.status(201).json(item);
}

export async function update(req, res) {
  const item = await workItemService.update(Number(req.params.id), req.body);
  res.json(item);
}

export async function remove(req, res) {
  await workItemService.remove(Number(req.params.id));
  res.status(204).end();
}
