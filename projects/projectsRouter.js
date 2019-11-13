const express = require('express');

const { verifyProjectId, validateProject } = require('../middlware');
const {
  get,
  insert,
  update,
  remove,
} = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await get();
    return (result === undefined)
      ? res.status(404).json({ message: 'no projects found' })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: 'Error getting projects',
    });
  }
});

router.get('/:id', verifyProjectId, async (req, res) => res.status(200).json(req.project));

router.post('/', validateProject, async (req, res) => {
  try {
    const result = await insert(req.project);
    return (result === undefined)
      ? res.status(500).json({ message: 'Error adding project' })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: 'Error adding project',
    });
  }
});

router.put('/:id', verifyProjectId, validateProject, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await update(id, req.project);
    return (result === undefined)
      ? res.status(500).json({ message: `Error updating id ${id}` })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `Error updating id ${id}`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await remove(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `Error removing id ${id}`,
    });
  }
});

module.exports = { router };
