const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  day:     { type: String, required: true },
  time:    { type: String, required: true },
  subject: { type: String, required: true },
  room:    { type: String, required: true },
});

const facultySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  department: { type: String, default: '' },
  subjects:   [{ type: String }],
  employeeId: { type: String, default: '' },
  timetable:  [timetableSchema],
});

module.exports = mongoose.model('Faculty', facultySchema);
