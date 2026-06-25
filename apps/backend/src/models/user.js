import prisma from '../lib/prisma.js';

export function findByUsername(username) {
  return prisma.user.findUnique({ where: { username } });
}

export function findById(id) {
  return prisma.user.findUnique({
    where: { id },
    include: { projectMemberships: { include: { project: true } } },
  });
}

export function create(data) {
  return prisma.user.create({ data });
}

export function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export function findAll() {
  return prisma.user.findMany({
    select: { id: true, username: true, email: true, name: true, role: true, accountStatus: true, createdAt: true }
  });
}

export function update(id, data) {
  return prisma.user.update({
    where: { id },
    data,
    select: { id: true, username: true, email: true, name: true, role: true, accountStatus: true }
  });
}

export function remove(id) {
  return prisma.user.delete({ where: { id } });
}
