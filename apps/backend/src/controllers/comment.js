import prisma from '../lib/prisma.js';

export async function getComments(req, res) {
  try {
    const comments = await prisma.docComment.findMany({
      where: { entityKey: req.params.entityKey },
      orderBy: { createdAt: 'asc' },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addComment(req, res) {
  try {
    const { text } = req.body;
    const comment = await prisma.docComment.create({
      data: {
        entityKey: req.params.entityKey,
        text,
        authorId: req.user.id,
        authorName: req.user.username,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteComment(req, res) {
  try {
    const commentId = Number(req.params.id);
    const comment = await prisma.docComment.findUnique({ where: { id: commentId } });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }
    await prisma.docComment.update({ 
      where: { id: commentId },
      data: { isDeleted: true }
    });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
