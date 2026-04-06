const express = require('express');
const router = express.Router();
const { getProfile, getTimetable, createAnnouncement } = require('../controllers/faculty.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

// All faculty routes require auth + faculty role
router.use(authMiddleware, allowRoles('faculty'));

router.get('/profile',         getProfile);
router.get('/timetable',       getTimetable);
router.post('/announcements',  createAnnouncement);

module.exports = router;
