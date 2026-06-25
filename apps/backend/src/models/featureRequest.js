import prisma from '../lib/prisma.js';

const include = { status: true, requestedBy: true };

export function findByPlatform(platformId) {
  return prisma.featureRequest.findMany({
    where: { platformId },
    orderBy: { createdAt: 'desc' },
    include,
  });
}

export function create(data) {
  return prisma.featureRequest.create({ data, include });
}

export function update(id, data) {
  return prisma.featureRequest.update({ where: { id }, data, include });
}

export function remove(id) {
  return prisma.featureRequest.delete({ where: { id } });
}
