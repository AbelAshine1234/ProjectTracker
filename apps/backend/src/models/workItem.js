import prisma from '../lib/prisma.js';

export function findByPlatform(platformId) {
  return prisma.activeWorkItem.findMany({
    where: { platformId },
    orderBy: { createdAt: 'desc' },
    include: { status: true, assignee: true },
  });
}

export function create(data) {
  return prisma.activeWorkItem.create({
    data,
    include: { status: true, assignee: true },
  });
}

export function update(id, data) {
  return prisma.activeWorkItem.update({
    where: { id },
    data,
    include: { status: true, assignee: true },
  });
}

export function remove(id) {
  return prisma.activeWorkItem.delete({ where: { id } });
}
