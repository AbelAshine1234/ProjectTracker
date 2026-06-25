import prisma from '../lib/prisma.js';

export function findByFeature(featureId) {
  return prisma.subTask.findMany({
    where: { featureId },
    orderBy: { order: 'asc' },
    include: { status: true, requestedBy: true, doneBy: true },
  });
}

export function create(data) {
  return prisma.subTask.create({
    data,
    include: { status: true, requestedBy: true, doneBy: true },
  });
}

export function update(id, data) {
  return prisma.subTask.update({
    where: { id },
    data,
    include: { status: true, requestedBy: true, doneBy: true },
  });
}

export function remove(id) {
  return prisma.subTask.delete({ where: { id } });
}
