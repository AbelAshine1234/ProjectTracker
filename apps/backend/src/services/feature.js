import * as featureModel from '../models/feature.js';

export function getByPlatform(platformId) {
  return featureModel.findByPlatform(platformId);
}

export function create(data) {
  return featureModel.create(data);
}

export function update(id, data) {
  return featureModel.update(id, data);
}

export function remove(id) {
  return featureModel.remove(id);
}
