import * as featureService from '../services/feature.js';

export async function getByPlatform(req, res) {
  const features = await featureService.getByPlatform(Number(req.params.platformId));
  res.json(features);
}

export async function create(req, res) {
  const feature = await featureService.create(req.body);
  res.status(201).json(feature);
}

export async function update(req, res) {
  const feature = await featureService.update(Number(req.params.id), req.body);
  res.json(feature);
}

export async function remove(req, res) {
  await featureService.remove(Number(req.params.id));
  res.status(204).end();
}
