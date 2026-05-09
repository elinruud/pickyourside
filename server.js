const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const portNumber = 3000;

const app = next({ dev, hostname, port: portNumber });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  const arduinoPort = new SerialPort({
    path: "/dev/cu.usbmodem14101",
    baudRate: 9600,
    dataBits: 8,
    parity: "none",
    stopBits: 1,
    flowControl: false,
  });

  const parser = arduinoPort.pipe(
    new ReadlineParser({
      delimiter: "\r\n",
    })
  );

  io.on("connection", (socket) => {
    console.log("Browser connected:", socket.id);
  });

  parser.on("data", (data) => {
    console.log("Arduino:", data);

    io.emit("vote", data);
  });

  httpServer.listen(portNumber, () => {
    console.log(`Server running at http://${hostname}:${portNumber}`);
  });
});