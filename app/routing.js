function Routing(app, dir, mode) {
  this.dir = dir;
  this.mode = mode;
  app.get('/', this.home.bind(this));
  app.get('/*', this.other.bind(this));
}

Routing.prototype.home = function(req, res) {
  res.header('Cache-Control', 'public, max-age=1800');
  res.sendFile(this.dir + '/html/' + this.mode + '.html');
};

Routing.prototype.other = function(req, res) {
  res.header('Cache-Control', 'public, max-age=1800');
  res.sendFile(this.dir + req.url);
};

module.exports = Routing;
