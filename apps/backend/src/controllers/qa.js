import * as qaService from '../services/qa.js';

export async function getByPlatform(req, res) {
  const stories = await qaService.getByPlatform(Number(req.params.platformId));
  res.json(stories);
}

export async function create(req, res) {
  const story = await qaService.create(req.body);
  res.status(201).json(story);
}

export async function update(req, res) {
  const story = await qaService.update(Number(req.params.id), req.body);
  res.json(story);
}

export async function remove(req, res) {
  await qaService.remove(Number(req.params.id));
  res.status(204).end();
}
