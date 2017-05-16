const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Routing = require('./routing');
const Msg = require('./messenger');

const app = express();
const server = http.createServer(app).listen(process.env.PORT || 8080);
const io = socketIo.listen(server);
const rootDir = __dirname.replace('backend', '');

const routing = new Routing(app, rootDir, process.env.PLAY_MODE || 'online');
routing.configure();

const messenger = new Msg(io);
messenger.start();
