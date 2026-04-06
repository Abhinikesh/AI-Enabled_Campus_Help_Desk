const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  subject:  { type: String, required: true },
  code:     { type: String, required: true },
  attended: { type: Number, default: 0 },
  total:    { type: Number, default: 0 },
});

const resultSchema = new mongoose.Schema({
  subject:  { type: String, required: true },
  code:     { type: String, required: true },
  marks:    { type: Number, default: 0 },
  maxMarks: { type: Number, default: 100 },
  grade:    { type: String, default: 'N/A' },
});

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body:  { type: String, required: true },
  date:  { type: Date, default: Date.now },
});

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  rollNumber: {
    type: String,
    match: [/^\d{8}$/, 'Roll number must be exactly 8 digits'],
    unique: true,
    required: true,
  },
  branch:   { type: String, default: '' },
  semester: { type: Number, default: 1 },
  year:     { type: Number, default: 1 },

  attendance:    [attendanceSchema],
  results:       [resultSchema],
  announcements: [announcementSchema],

  fees: {
    total:    { type: Number, default: 0 },
    paid:     { type: Number, default: 0 },
    due:      { type: Number, default: 0 },
    lastPaid: { type: Date, default: null },
  },
});

module.exports = mongoose.model('Student', studentSchema);
