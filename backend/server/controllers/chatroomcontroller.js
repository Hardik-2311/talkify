const ChatRoom = require('../models/chatroom');
const asyncHandler = require('express-async-handler');
const User = require("../models/user")
// Create a new chat room
exports.createChatRoom = asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (name == "" || type == "") {
        return res.status(404).json({ message: 'It cannot be empty ' });
    }
    const userId = req.body.userId;
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Create a new chat room with the current user as the admin
    const chatRoom = new ChatRoom({
        name,
        type,
        members: [
            { user: userId, role: 'admin' },
        ]
    });

    await chatRoom.save();
    res.status(201).json({ message: 'Chat room created successfully', chatRoom });
});

// Kick a user from the chat room (only admins and moderators can kick users)
exports.kickUser = asyncHandler(async (req, res) => {
    const { roomId, userId } = req.params;

    // const userId = req.user.id; // Assuming authenticated user's ID is available in req.user

    // Find the chat room by ID
    const chatRoom = await ChatRoom.findById(roomId);
    if (chatRoom.members.length <= 0) {
        res.status(404).json({ message: 'No members in chatroom' });
    }
    // Check if the user is an admin or moderator of the chat room
    // if (chatRoom.admin !== userId && !chatRoom.moderators.includes(userId)) {
    //     return res.status(403).json({ message: 'Only admins and moderators can kick users' });
    // }
    let check2 = false
    const check = chatRoom.members.map((member) => {
        if (member.user.toString() === userId) {
            check2 = true;
            return;
        }
    });

    if (check2 == false) {
        res.status(404).json({ message: 'user is not member of this chat' });
    }
    // Remove the user from the members list
    const index = chatRoom.members.map((member) => member.user.toString() === userId);
    if (index !== -1) {
        chatRoom.members.splice(index, 1);
    }

    await chatRoom.save();
    res.status(200).json({ message: 'User kicked successfully' });
});

// joining a room
exports.joinChatRoom = asyncHandler(async (req, res) => {
    const { roomId, userId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Check if the chat room exists
    const chatRoom = await ChatRoom.findById(roomId);
    if (!chatRoom) {
        return res.status(404).json({ message: 'Chat room not found' });
    }

    const check = chatRoom.members.map((member) => member.user.toString() === userId);
    console.log(check)
    // Check if the user is already a member of the chat room
    let flag = false;
    const isMember = chatRoom.members.map((member) => {
        if (member.user.toString() === userId) {
            flag = true;
        }
        else {
            flag = false;
        }
    });
    if (flag) {
        return res.status(400).json({ message: 'User is already a member of the chat room' });
    }

    // Add the user to the members list of the chat room
    chatRoom.members.push({ user: userId, role: 'member' });

    // Save the updated chat room
    await chatRoom.save();

    res.status(200).json({ message: 'User joined the chat room successfully' });
});


// Get all chat rooms of a user
exports.getAllChatRoomsOfUser = asyncHandler(async (req, res) => {
    try {
        const rooms = await ChatRoom.find({});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete a chat room by ID
exports.deleteChatRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.roomId;

    // Find the chat room by ID
    const chatRoom = await ChatRoom.findById(roomId);
    if (!chatRoom) {
        return res.status(404).json({ message: 'Chat room not found' });
    }

    // Delete the chat room
    await chatRoom.deleteOne();
    const rooms = await ChatRoom.find({});
    console.log(rooms)
    res.status(200).json({ message: 'Chat room deleted successfully', deletedRoomId: roomId, rooms });
});
