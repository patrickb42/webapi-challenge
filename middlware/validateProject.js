const validateProject = (req, res, next) => {
  const { name, description } = req.body;

  return (name === undefined || description === undefined)
    ? res.status(400).json({ message: 'Projects must have name and description' })
    : next();
};

module.exports = { validateProject };
