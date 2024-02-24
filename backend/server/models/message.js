const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true }
});

const Message = mongoose.model('Message', messageSchema);
mongoose.models = {};
module.exports = Message;
