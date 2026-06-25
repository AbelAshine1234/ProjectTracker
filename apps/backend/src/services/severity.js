import * as severityModel from '../models/severity.js';

export function getByProject(projectId) {
  return severityModel.findByProject(projectId);
}

export function create(data) {
  return severityModel.create(data);
}

export function update(id, data) {
  return severityModel.update(id, data);
}

export function remove(id) {
  return severityModel.remove(id);
}
