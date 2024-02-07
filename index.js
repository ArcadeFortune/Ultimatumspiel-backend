const express = require("express");
const webserver = express()
  .use((req, res) => res.sendFile("./a.html", { root: __dirname }))
  
const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });

sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send("connection established");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    sockserver.clients.forEach((client) => {
      console.log(`distributing message: ${data}`);
      client.send(`${data}`);
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});


webserver.listen(3000, () => console.log(`Listening on ${3000}`));