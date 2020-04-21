const url = require('url');
const routes = require('../helpers/routes.json');
const sortedRoutes = routes.sort((a, b) => a.price > b.price);

function deepSearch(origen, destiny, result, finalPrice, fly) {
    const route = fly
        ? sortedRoutes.find(findFly => findFly.to === fly.from)
        : sortedRoutes.find(findFly => findFly.to === destiny)

    if (!route) {
        return JSON.stringify({ message: 'Route not found.' });
    }

    finalPrice += route.price;
    result.unshift(route.from);

    if (route.from === origen) {
        result.push(destiny);
        return JSON.stringify({ route: result.toString(), price: finalPrice });
    }

    return deepSearch(origen, destiny, result, finalPrice, route);
}

module.exports = {
    getHandler(req, res) {
        const { pathname } = url.parse(req.url, true);
        const [, , origin, destiny] = pathname.split('/');
        const route = [];
        const finalPrice = 0;

        const response = deepSearch(origin, destiny, route, finalPrice);

        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        return res.end(response);
    }
} 