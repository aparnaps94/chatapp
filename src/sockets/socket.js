const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const onlineUsers = new Map();
module.exports = (io) => {

    io.use((socket, next) => {
        try {
            const user = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET);
            socket.user = user;
            next();

        } catch {
            next(new Error("auth error"))
        }
    })

    io.on("connection", (socket) => {
        const userId = socket.user.id;
        onlineUsers.set(userId, socket.id);

        socket.on("send_message", async ({ receiver_id, content }) => {
            const msg = await Message.create({
                sender_id: userId,
                receiver_id,
                content
            });
            const receiverSocket = onlineUsers.get(receiver_id);
            if (receiverSocket) {
                io.to(receiverSocket).emit('receive_message,msg');
            }
        }
        );
        socket.on("disconnect", () => {
            onlineUsers.delete(userId);

        });

    });
};