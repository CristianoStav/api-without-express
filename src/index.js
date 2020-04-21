const port = 3000;

const server = require('./config/index');

server.listen(port, () => {
    console.log(`Server Running on ${port}`);
});

module.exports = server;