const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationController');

// Route for creating a new notification
router.post('/', notificationsController.createNotification);

// Route for getting all notifications
router.get('/', notificationsController.getAllNotifications);

// Route for getting notifications by user
router.get('/user/:userId', notificationsController.getNotificationsByUser);

// Route for deleting a notification
router.delete('/:notificationId', notificationsController.deleteNotification);

module.exports = router;
