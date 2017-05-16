function Routing(app, dir, mode) {
  this.app = app;
  this.dir = dir;
  this.mode = mode;
}

Routing.prototype.configure = function configure() {
  this.app.get('/', this.home.bind(this));
  this.app.get('/assets/*', this.other.bind(this));
};

Routing.prototype.home = function home(req, res) {
  res.header('Cache-Control', 'public, max-age=1800');
  res.sendFile(`${this.dir}/public/${this.mode}.html`);
};

Routing.prototype.other = function other(req, res) {
  res.header('Cache-Control', 'public, max-age=1800');
  res.sendFile(this.dir + req.url);
};

module.exports = Routing;
