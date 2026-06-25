import * as workItemModel from '../models/workItem.js';

export function getByPlatform(platformId) {
  return workItemModel.findByPlatform(platformId);
}

export function create(data) {
  return workItemModel.create(data);
}

export function update(id, data) {
  return workItemModel.update(id, data);
}

export function remove(id) {
  return workItemModel.remove(id);
}
