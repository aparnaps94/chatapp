require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes")
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const console = require("console");

const app = express();
app.use(express.json());
connectDB();

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
require("./sockets/socket")(io);
server.listen(process.env.PORT, () => {
    console.log("server running");
});
module.exports = app;