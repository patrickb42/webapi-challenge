const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const { projectsRouter } = require('./projects');
const { actionsRouter } = require('./actions');

const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

const port = process.env.PORT;

server.listen(port, () => console.log(`listening on port ${port}`));
