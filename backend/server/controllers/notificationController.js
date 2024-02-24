const Notification = require('../models/notifications');

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const notification = new Notification({
            title,
            content,
            user: userId
        });
        await notification.save();
        res.status(201).json({ message: 'Notification created successfully', notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get notifications for a specific user
exports.getNotificationsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notifications = await Notification.find({ user: userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
