const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const dotenv = require("dotenv");
const sendMail = require("./services/mailServices");
dotenv.config();
const portNumber = 5500 || 6000;
const room = new Map();

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("enterRoom", (data) => {
    room.set("roomId", data.room);
    if (!data.query) {
      socket.join(data.room);
      sendMail(data.room, data.dataIp, data.time);
    } else {
      socket.join(Number(data.query));
    }
  });
  socket.on("sendMsg", (data) => {
    socket
      .to(data.room)
      .emit("receiveMessage", { msg: data.msg, author: data.author });
  });
  socket.on("chat-visibility", (data) => {
    console.log("chat-visibility", data.chat);
    socket.to(data.room).emit("showChat", data.chat);
  });
  socket.on("disconnect", () => {
    const roomChat = room.get("roomId");
    socket.to(roomChat).emit("clientDisconnect", { msg: "User Disconnected" });
  });
});

server.listen(portNumber, (error) => {
  error
    ? console.log("Error on server start")
    : console.log(`Server is running on port ${portNumber}`);
});
