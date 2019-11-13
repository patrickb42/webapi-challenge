const { get } = require('../data/helpers/actionModel');

const verifyActionId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await get(id);
    if (result === undefined) return res.status(404).json({ message: `No action found under id ${id}` });
    req.action = result;
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `error getting action by id ${id}`,
    });
  }
  return next();
};

module.exports = { verifyActionId };
