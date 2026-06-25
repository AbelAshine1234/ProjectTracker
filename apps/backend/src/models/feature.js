import prisma from '../lib/prisma.js';

export function findByPlatform(platformId) {
  return prisma.feature.findMany({
    where: { platformId },
    orderBy: { order: 'asc' },
    include: { subTasks: { orderBy: { order: 'asc' }, include: { status: true, requestedBy: true, doneBy: true } } },
  });
}

export function create(data) {
  return prisma.feature.create({ data });
}

export function update(id, data) {
  return prisma.feature.update({ where: { id }, data });
}

export function remove(id) {
  return prisma.feature.delete({ where: { id } });
}
