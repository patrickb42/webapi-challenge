const validateProject = (req, res, next) => {
  const { name, description, completed } = req.body;

  req.project = { name, description, completed };
  return (name === undefined || description === undefined)
    ? res.status(400).json({ message: 'Projects must have name and description' })
    : next();
};

module.exports = { validateProject };
