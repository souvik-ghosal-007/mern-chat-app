const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  messageType: {
    type: String,
    enum: ["text", "image"],
  },

  message: {
    type: String,
  },

  imageUrl: {
    type: String,
  },

  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
