const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const onlineUsers = new Map();

module.exports = (io) => {

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token;
            if (!token) return next(new Error("No token"));

            const user = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = user;
            next();
        } catch (error) {
            next(new Error("auth error"));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.user.id;

        console.log("User connected:", userId);

        onlineUsers.set(userId, socket.id);

        socket.on("send_message", async ({ receiver_id, content }) => {
            try {
                const msg = await Message.create({
                    sender_id: userId,
                    receiver_id,
                    content
                });

                console.log("Message saved:", msg);

                const receiverSocket = onlineUsers.get(receiver_id);

                if (receiverSocket) {
                    io.to(receiverSocket).emit("receive_message", msg);
                }

                // send back to sender
                socket.emit("message_sent", msg);

            } catch (err) {
                console.error("Message error:", err.message);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", userId);
            onlineUsers.delete(userId);
        });
    });
};