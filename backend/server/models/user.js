const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// relations -> Many -> Many
userSchema.virtual('chatRooms', {
    ref: 'ChatRoom',
    localField: '_id',
    foreignField: 'participants'
});
// relations one ->  many

userSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'user'
});

userSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'user'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
