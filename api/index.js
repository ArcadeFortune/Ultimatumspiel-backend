// const express = require("express");
// const webserver = express()
//   .use((req, res) => res.sendFile("./a.html", { root: __dirname }))
  
// const { WebSocketServer } = require("ws");
// const sockserver = new WebSocketServer({ port: 443 });

// sockserver.on("connection", (ws) => {
//   console.log("New client connected!");
//   ws.send("connection established");
//   ws.on("close", () => console.log("Client has disconnected!"));
//   ws.on("message", (data) => {
//     sockserver.clients.forEach((client) => {
//       console.log(`distributing message: ${data}`);
//       client.send(`${data}`);
//     });
//   });
//   ws.onerror = function () {
//     console.log("websocket error");
//   };
// });


// webserver.listen(3000, () => console.log(`Listening on ${3000}`));


const app = require('express')();
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;