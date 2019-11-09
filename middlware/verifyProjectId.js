const { get } = require('../data/helpers/projectModel');

const verifyProjectId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await get(id);
    if (result === undefined) return res.status(404).json({ message: `No project found under id ${id}` });
    req.project = result;
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `error getting project by id ${id}`,
    });
  }
  return next();
};

module.exports = { verifyProjectId };
