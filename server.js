const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const dotenv = require('dotenv');
dotenv.config();
const portNumber = process.env.PORT || 6500;

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log("Send Email", socket.id);
  
    // socket.on("enterRoom", (data) => {
    //   socket.join(data);
    // });
    // socket.on("sendMsg", (data) => {
    //   console.log("Room", data);
    //   socket.to(data.room).emit("receiveMessage", data);
    // });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });


server.listen(portNumber, (error) => {
    error
      ? console.log("Error on server start")
      : console.log(`Server is running on port ${portNumber}`);
  });