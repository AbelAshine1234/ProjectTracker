import * as qaModel from '../models/qa.js';

export function getByPlatform(platformId) {
  return qaModel.findByPlatform(platformId);
}

export function create(data) {
  return qaModel.create(data);
}

export function update(id, data) {
  return qaModel.update(id, data);
}

export function remove(id) {
  return qaModel.remove(id);
}
