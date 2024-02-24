const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ['one-to-one', 'group'], required: true },
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['admin', 'member'], default: 'member' }
    }]
});


chatRoomSchema.virtual('participants', {
    ref: 'User',
    localField: '_id',
    foreignField: 'chatRooms'
});

chatRoomSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chatRoom'
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
