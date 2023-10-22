const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 6500;

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});