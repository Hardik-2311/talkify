const express = require('express');
const router = express.Router();

const {
    registerUser, loginUser, currentUser, updateUser, deleteUserAccount, logoutUser, getAllUsers
} = require('../controllers/usercontroller');
const authMiddleware = require('../middlewares/verification');

console.log(authMiddleware)
// Register
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get current user
router.get('/current-user', authMiddleware, currentUser);

// Update user
router.put('/users/:userId', authMiddleware, updateUser);

// Delete user account
router.delete('/users/:userId', authMiddleware, deleteUserAccount);

// logout
router.post('/logout', logoutUser);

// all users
router.get('/', getAllUsers);

module.exports = router;