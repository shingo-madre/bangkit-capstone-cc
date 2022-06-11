const express = require('express');
const {
  addUser, loginUser,
} = require('../controllers/user-controller');

const router = express.Router();

router.post('/', loginUser);

module.exports = {
    routes: router
}