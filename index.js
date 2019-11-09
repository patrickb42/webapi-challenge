const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const { projectsRouter } = require('./projects');

const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);

const port = process.env.PORT;

server.listen(port, () => console.log(`listening on port ${port}`));
