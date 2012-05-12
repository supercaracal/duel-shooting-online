function Routing(app) {
    app.get('/', this.home);
    app.get('/*', this.other);
};

Routing.prototype.home = function(req, res) {
    res.sendfile(__dirname + '/index.html');
};

Routing.prototype.other = function(req, res) {
    res.sendfile(__dirname + req.url);
};

module.exports = Routing;
