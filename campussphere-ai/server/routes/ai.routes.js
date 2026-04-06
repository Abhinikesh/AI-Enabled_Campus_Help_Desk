const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/ai.controller');
const authMiddleware = require('../middleware/auth.middleware');

// AI chat — any authenticated user can use it
router.post('/chat', authMiddleware, chat);

module.exports = router;
