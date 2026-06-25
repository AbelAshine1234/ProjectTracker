import prisma from '../lib/prisma.js';

export function findByProject(projectId, type) {
  const where = { projectId };
  if (type) where.type = type;
  return prisma.status.findMany({
    where,
    orderBy: [{ type: 'asc' }, { order: 'asc' }],
  });
}

export function create(data) {
  return prisma.status.create({ data });
}

export function update(id, data) {
  return prisma.status.update({ where: { id }, data });
}

export function remove(id) {
  return prisma.status.delete({ where: { id } });
}
