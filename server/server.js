/**
 * Created by Yigit Yesilpinar on 28.01.2017.
 */
import express from 'express';
import path from 'path';
//import open from 'open';
import compression from 'compression';
/* eslint-disable no-console */
import favicon from "serve-favicon";

import http from 'http';
import SocketIO from 'socket.io';

const host = "localhost";
const port = process.env.PORT || 8000;
const app = express();

app.use(compression());
app.use(express.static('dist'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.use(favicon(path.resolve(__dirname + '/tools/favicon.ico')));

express.static.mime.define({"text/css": ["css"]});
express.static.mime.define({"application/x-font-woff": ["woff"]});
express.static.mime.define({"application/x-font-ttf": ["ttf"]});
express.static.mime.define({"application/vnd.ms-fontobject": ["eot"]});
express.static.mime.define({"font/opentype": ["otf"]});


// All requests to index.html
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

let server = http.createServer(app);
let io = new SocketIO(server);
let connectedUsers = {};
let userCount = 0;
let userList = [];

// handle socket requests
io.on('connection', function(socket){

  connectedUsers[socket.id]=("user_" + userCount);
  userCount++;

  function refreshUserList(socket_id) {
    if(Object.keys(connectedUsers).length > 0){
      userList = [];
      for(let key in connectedUsers){
        if(connectedUsers.hasOwnProperty(key)){
          userList.push(connectedUsers[key]);
        }
      }
    }
    io.emit('user list changed', {userList:userList, self: socket_id});
  }
  refreshUserList(socket.id);
  io.emit('user connected', {user: connectedUsers[socket.id], socket_id: socket.id});
  socket.on('disconnect', function(){
    let exist = connectedUsers.hasOwnProperty(socket.id);
    if (exist) {
      io.emit('user disconnected', {user: connectedUsers[socket.id], socket_id: socket.id});
      delete connectedUsers[socket.id];
    }

    refreshUserList();
  });
  socket.on('chat message', function(data){
    let user = connectedUsers[data.socket_id];
    data["user"] =user;
    io.emit('chat message', data);
  });

  socket.on('name changed', function(data){
    let user = connectedUsers[data.socket_id];
    data["user"] =user;
    connectedUsers[data.socket_id] =data.newName;
    io.emit('name changed', data);
    refreshUserList();
  });


});
server.listen(port, "127.0.0.1");


export default app;
