const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagecontroller');

// Create a new message
router.post('/', messageController.createMessage);

// update message
router.put('message/:messageId', messageController.updateMessage);

// Delete a message
router.delete('/:messageId', messageController.deleteMessage);

// messages from only specific chtroom
router.get('/chatroom/:chatRoomId', messageController.getMessagesByChatRoomId);
module.exports = router;
