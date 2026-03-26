const express = require("express");
const router = express.Router();
const message = require("../controllers/messageController");
const auth = require("../middleware/authMiddleware");

router.post("/send", auth, message.sendmessage);
router.get("/:userId", auth, message.getmessages);
router.get("/", auth, message.getconversations);

module.exports = router;