import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as projectController from '../controllers/project.js';
import prisma from '../lib/prisma.js';

const router = Router();

router.use(authenticate);

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.remove);
router.post('/:id/members', projectController.addMember);
router.delete('/:id/members/:memberId', projectController.removeMember);

// === Resource Links CRUD ===
router.post('/:id/resource-links', async (req, res) => {
  try {
    const link = await prisma.resourceLink.create({
      data: { ...req.body, projectId: Number(req.params.id) },
    });
    res.status(201).json(link);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id/resource-links/:linkId', async (req, res) => {
  try {
    const link = await prisma.resourceLink.update({
      where: { id: Number(req.params.linkId) },
      data: req.body,
    });
    res.json(link);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id/resource-links/:linkId', async (req, res) => {
  try {
    await prisma.resourceLink.delete({ where: { id: Number(req.params.linkId) } });
    res.status(204).end();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// === Git Repositories CRUD ===
router.post('/:id/git-repos', async (req, res) => {
  try {
    const repo = await prisma.gitRepository.create({
      data: { ...req.body, projectId: Number(req.params.id) },
    });
    res.status(201).json(repo);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id/git-repos/:repoId', async (req, res) => {
  try {
    const repo = await prisma.gitRepository.update({
      where: { id: Number(req.params.repoId) },
      data: req.body,
    });
    res.json(repo);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id/git-repos/:repoId', async (req, res) => {
  try {
    await prisma.gitRepository.delete({ where: { id: Number(req.params.repoId) } });
    res.status(204).end();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// === Supplementary Docs CRUD ===
router.post('/:id/supplementary-docs', async (req, res) => {
  try {
    const doc = await prisma.supplementaryDoc.create({
      data: { ...req.body, projectId: Number(req.params.id) },
    });
    res.status(201).json(doc);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id/supplementary-docs/:docId', async (req, res) => {
  try {
    const doc = await prisma.supplementaryDoc.update({
      where: { id: Number(req.params.docId) },
      data: req.body,
    });
    res.json(doc);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id/supplementary-docs/:docId', async (req, res) => {
  try {
    await prisma.supplementaryDoc.delete({ where: { id: Number(req.params.docId) } });
    res.status(204).end();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;
