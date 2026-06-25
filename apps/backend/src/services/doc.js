import * as docModel from '../models/doc.js';

export function getByProject(projectId) {
  return docModel.findByProject(projectId);
}

export function create(data, user) {
  return docModel.create({ ...data, createdBy: user.name || user.username });
}

export function update(id, data, user) {
  return docModel.update(id, { ...data, updatedBy: user.name || user.username });
}

export function remove(id) {
  return docModel.remove(id);
}
