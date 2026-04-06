const Faculty = require('../models/Faculty');
const Announcement = require('../models/Announcement');

// GET /api/faculty/profile
const getProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user.userId }).populate('userId', 'name email');
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty profile not found' });

    console.log(`✅ Faculty profile fetched for userId: ${req.user.userId}`);
    res.status(200).json({ success: true, data: faculty });
  } catch (err) {
    console.error('❌ Faculty getProfile error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/faculty/timetable
const getTimetable = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user.userId });
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });

    console.log(`✅ Timetable fetched for userId: ${req.user.userId}`);
    res.status(200).json({ success: true, data: faculty.timetable });
  } catch (err) {
    console.error('❌ getTimetable error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/faculty/announcements
const createAnnouncement = async (req, res) => {
  try {
    const { title, body, targetRoles } = req.body;
    if (!title || !body) {
      return res.status(400).json({ success: false, message: 'Title and body are required' });
    }

    const announcement = await Announcement.create({
      title,
      body,
      targetRoles: targetRoles || ['student'],
      createdBy: req.user.userId,
    });

    console.log(`✅ Announcement created by faculty userId: ${req.user.userId}`);
    res.status(201).json({ success: true, message: 'Announcement created', data: announcement });
  } catch (err) {
    console.error('❌ createAnnouncement error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getProfile, getTimetable, createAnnouncement };
