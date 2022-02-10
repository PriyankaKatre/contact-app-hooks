const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: './build'
});
const PORT = process.env.PORT || 4000;
server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))
server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});

// const jsonServer = require('json-server');
// const app = jsonServer.create();
// const path = require('path');
// const express = require('express');
// const middlewares = jsonServer.defaults();
// const router = jsonServer.router('db.json');
// const port = process.env.PORT || 4000;

// app.use('/db', middlewares, router);
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(port);
