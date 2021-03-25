const express = require("express");
const morgan = require("morgan");
// const noInsomnia = require('./middleware/no-insomnia')
const logger = require('./api/middleware/middleware');
const userRouter = require('./api/users/users-router');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
// server.use(noInsomnia())
server.use(morgan("combined"));

// server.use(logger('long'))
server.use(logger.logger);

server.use(userRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});