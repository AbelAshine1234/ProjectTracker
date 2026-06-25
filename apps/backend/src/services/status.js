import * as statusModel from '../models/status.js';

export function getByProject(projectId, type) {
  return statusModel.findByProject(projectId, type);
}

export function create(data) {
  return statusModel.create(data);
}

export function update(id, data) {
  return statusModel.update(id, data);
}

export function remove(id) {
  return statusModel.remove(id);
}
