import prisma from '../lib/prisma.js';

export function findByProject(projectId) {
  return prisma.severity.findMany({
    where: { projectId },
    orderBy: { order: 'asc' },
  });
}

export function create(data) {
  return prisma.severity.create({ data });
}

export function update(id, data) {
  return prisma.severity.update({ where: { id }, data });
}

export function remove(id) {
  return prisma.severity.delete({ where: { id } });
}
