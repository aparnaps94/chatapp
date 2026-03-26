const Message = require("../models/Message");
exports.sendmessage = async (req, res) => {
    const { receiver_id, content } = req.body;
    const msg = await Message.create({
        sender_id: req.user.id,
        receiver_id,
        content
    });
    res.json(msg);

};

exports.getmessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const msgs = await Message.find({
            $or: [{ sender_id: req.user.id, receiver_id: userId },
            { sender_id: userId, receiver_id: req.user.id },]

        })
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.status(200).json(msgs);
    }
    catch (error) {
        console.log("message error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.getconversations = async (req, res) => {
    const messages = await Message.aggregate([{
        $match: {
            $or: [
                { sender_id: req.user.id },
                { receiver_id: req.user.id },
            ],
        },
    },
    { $sort: { timestamp: -1 }, },
    {
        $group: {
            _id: "$receiver_id",
            lastMessage: { $first: "$content" },
        }
    }

    ]);
    res.json(messages);
};