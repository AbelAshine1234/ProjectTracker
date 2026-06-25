import * as projectModel from '../models/project.js';

export function getAll() {
  return projectModel.findAll();
}

export function getById(id) {
  return projectModel.findById(id);
}

export function create(data, userId) {
  return projectModel.create({
    ...data,
    members: { create: { userId, role: 'OWNER' } },
  });
}

export function update(id, data) {
  return projectModel.update(id, data);
}

export function remove(id) {
  return projectModel.remove(id);
}

export function addMember(projectId, userId, role) {
  return projectModel.addMember({ projectId, userId, role: role || 'MEMBER' });
}

export function removeMember(id) {
  return projectModel.removeMember(id);
}
