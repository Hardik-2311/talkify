const Message = require('../models/message');
const asyncHandler = require('express-async-handler');

// Controller to create a new message
exports.createMessage = asyncHandler(async (req, res) => {
    const { content, user, chatRoom } = req.body;

    const newMessage = new Message({
        content,
        user,
        chatRoom
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message created successfully', newMessage });
});

// Controller to fetch all messages
exports.getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find();
    res.status(200).json(messages);
});

// Controller to fetch a message by its ID
exports.getMessageById = asyncHandler(async (req, res) => {
    const messageId = req.params.id;
    const message = await Message.findById(messageId);
    if (!message) {
        return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
});

// Controller to update an existing message
exports.updateMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.id;
    const { content } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(messageId, { content }, { new: true });
    if (!updatedMessage) {
        return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message updated successfully', updatedMessage });
});

// Controller to delete a message
exports.deleteMessage = asyncHandler(async (req, res) => {
    console.log(req.params)
    const messageId = req.params.messageId;
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' });
    }
    const remainingMessages = await Message.find();
    res.status(200).json({ message: 'Message deleted successfully', remainingMessages });
});


// Controller to fetch messages by chatRoomId
exports.getMessagesByChatRoomId = asyncHandler(async (req, res) => {
    const chatRoomId = req.params.chatRoomId;
    const messages = await Message.find({ chatRoom: chatRoomId });
    if (!messages || messages.length === 0) {
        return res.status(404).json({ message: 'Messages not found for the specified chat room ID' });
    }
    res.status(200).json(messages);
});
