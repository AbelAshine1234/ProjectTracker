import prisma from '../lib/prisma.js';

export function findByPlatform(platformId) {
  return prisma.qAUserStory.findMany({
    where: { platformId },
    orderBy: { order: 'asc' },
    include: { status: true, tester: true, steps: { orderBy: { stepNumber: 'asc' } } },
  });
}

const include = { status: true, tester: true, steps: { orderBy: { stepNumber: 'asc' } } };

export function create(data) {
  return prisma.qAUserStory.create({ data, include });
}

export function update(id, data) {
  return prisma.qAUserStory.update({ where: { id }, data, include });
}

export function remove(id) {
  return prisma.qAUserStory.delete({ where: { id } });
}
