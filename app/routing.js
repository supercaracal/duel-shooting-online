function Routing(app, dir) {
    this.dir = dir;
    app.get('/', this.home.bind(this));
    app.get('/*', this.other.bind(this));
};

Routing.prototype.home = function(req, res) {
    res.header('Cache-Control', 'public, max-age=1800');
    res.sendfile(this.dir + '/index.html');
};

Routing.prototype.other = function(req, res) {
    res.header('Cache-Control', 'public, max-age=1800');
    res.sendfile(this.dir + req.url);
};

module.exports = Routing;
