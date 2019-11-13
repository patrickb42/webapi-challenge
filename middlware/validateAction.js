const { get } = require('../data/helpers/projectModel');

const validateAction = async (req, res, next) => {
  const {
    project_id,
    description,
    notes,
    completed,
  } = req.body;

  req.action = {
    project_id,
    description,
    notes,
    completed,
  };
  try {
    const result = get(project_id);
    return (result === undefined
            || project_id === undefined
            || description === undefined
            || description.length > 128
            || notes === undefined)
      ? res.status(400).json({ message: 'Actions must have project_id, description (no more than 128 characters) and notes' })
      : next();
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `error getting project by id ${project_id}`,
    });
  }
};

module.exports = { validateAction };
