const express = require('express');

const {
  get,
  insert,
  update,
  remove,
} = require('../data/helpers/actionModel');
const { verifyActionId, validateAction } = require('../middlware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await get();
    return (result === undefined)
      ? res.status(404).json({ message: 'no actions found' })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: 'Error getting actions',
    });
  }
});

router.get('/:id', verifyActionId, async (req, res) => res.status(200).json(req.action));

router.post('/', validateAction, async (req, res) => {
  try {
    const result = await insert(req.action);
    return (result === undefined)
      ? res.status(500).json({ message: 'Error adding action' })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: 'Error adding action',
    });
  }
});

router.put('/:id', verifyActionId, validateAction, async (req, res) => {
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
