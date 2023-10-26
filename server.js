const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const dotenv = require('dotenv');
const sendMail = require("./services/mailServices");
dotenv.config();
const portNumber = 5500|| 6000;

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connect", socket.id);
    socket.on("enterRoom", (data) => {
      if(!data.query){
        socket.join(data.room)
        sendMail(data.room, data.ip)
      } else{
        socket.join(Number(data.query))
      }   
       
      
    });
    socket.on("sendMsg", (data) => {
      socket.to(data.room).emit("receiveMessage", data.msg);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });


server.listen(portNumber, (error) => {
    error
      ? console.log("Error on server start")
      : console.log(`Server is running on port ${portNumber}`);
  });