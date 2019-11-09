const express = require('express');

const { verifyProjectId } = require('../middlware');
const { get } = require('../data/helpers/projectModel');

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

module.exports = { router };
