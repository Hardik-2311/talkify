const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatroomcontroller');

// Route to create a new chat room
router.post('/register', chatRoomController.createChatRoom);

// Route to kick a user from a chat room
router.delete('/:roomId/kick/:userId', chatRoomController.kickUser);

// join the room
router.post('/join', chatRoomController.joinChatRoom);

router.get('', chatRoomController.getAllChatRoomsOfUser);

// delete the room
router.delete('/:roomId', chatRoomController.deleteChatRoom);
module.exports = router;
