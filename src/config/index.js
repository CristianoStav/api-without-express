const http = require('http');
const url = require('url');
const getController = require('../controllers/get');
const postController = require('../controllers/post');

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);

    if (req.method === 'GET' && pathname.match(/\/quote\/\w{3}\/\w{3}/)) {
        getController.getHandler(req, res);
    } else if (req.method === 'POST' && pathname === '/route') {
        postController.postHandler(req, res);
    } else {
        res.statusCode = 404;
        res.setHeader('Content-type', 'application/json');
        return res.end(JSON.stringify({ message: 'Invalid URL/METHOD.' }));
    }
});

module.exports = server;