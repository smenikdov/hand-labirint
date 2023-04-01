const http = require("http");
const express = require("express");
const WebSocketServer = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer.Server({ server });

// Массив для хранения соединений WebSocket
interface Connection {
    userCode: string,
    ws: WebSocket,
};
const connections = [];

wss.on('connection', (ws: WebSocket, req) => {
    console.log(req);
    // const userCode = req.url.split('/').pop();
    // connections.push({ userCode, ws });
    // console.log(`User ${userCode} connected`);

    // ws.addEventListener('message', (message) => {
    //     const { recipientCode, text } = JSON.parse(message);
    //     const recipient = connections.find((conn) => conn.userCode === recipientCode);
    //     if (recipient) {
    //         recipient.ws.send(JSON.stringify({ senderCode: userCode, text }));
    //     }
    // });

    // ws.addEventListener('close', () => {
    //     console.log(`User ${userCode} disconnected`);
    //     connections.splice(connections.findIndex((conn) => conn.ws === ws), 1);
    // });
});


server.listen(8080, () => {
    console.log('Server listening on port 8080');
});