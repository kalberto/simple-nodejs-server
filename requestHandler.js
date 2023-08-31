const { routes } = require('./routes');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (routes[method][url]) {
        const callback = routes[method][url];
        return callback(req, res);
    }
};

module.exports = requestHandler;