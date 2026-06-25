import * as subtaskModel from '../models/subtask.js';

export function getByFeature(featureId) {
  return subtaskModel.findByFeature(featureId);
}

export function create(data) {
  return subtaskModel.create(data);
}

export function update(id, data) {
  return subtaskModel.update(id, data);
}

export function remove(id) {
  return subtaskModel.remove(id);
}
