import prisma from '../lib/prisma.js';

export function findByProject(projectId) {
  return prisma.docPage.findMany({
    where: { projectId },
    orderBy: { order: 'asc' },
    include: { children: { orderBy: { order: 'asc' } }, comments: { orderBy: { createdAt: 'desc' }, take: 5 } },
  });
}

export function create(data) {
  return prisma.docPage.create({ data });
}

export function update(id, data) {
  return prisma.docPage.update({ where: { id }, data });
}

export function remove(id) {
  return prisma.docPage.delete({ where: { id } });
}
