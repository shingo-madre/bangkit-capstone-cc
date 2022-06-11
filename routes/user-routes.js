const express = require('express');
const {
  addUser, 
  getAllUsers, 
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/user-controller');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/user', addUser);
router.get('/users', requireAuth, getAllUsers);
router.get('/user/:id', requireAuth, getUser);
router.put('/user/:id', requireAuth, updateUser);
router.delete('/user/:id', requireAuth, deleteUser);

module.exports = {
    routes: router
}