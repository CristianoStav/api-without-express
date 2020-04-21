const fs = require('fs');

module.exports = {
    postHandler(req, res) {
        let body = [];
        const path = `${__dirname}/../helpers/routes.json`;

        req
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', async () => {
                body = Buffer.concat(body).toString();

                if (!body) {
                    res.statusCode = 400;
                    res.setHeader('Content-type', 'application/json');
                    return res.end(JSON.stringify({ message: 'Request not have body.' }));
                }

                let file = await fs.readFileSync(path);
                file = JSON.parse(file);
                file.push(JSON.parse(body));
                file = JSON.stringify(file);

                await fs.writeFileSync(path, file);

                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                return res.end();
            });
    }
}