class AppController {
    constructor() {
    }

    static index(req, res) {
        res.write('<html>');
        res.write('<head><title>Hello</title></head>');
        res.write('<body>Hello there</body>');
        res.write('</html>');
        return res.end();
    }
}

module.exports = {
    AppController
}