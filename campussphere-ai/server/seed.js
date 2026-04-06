/**
 * CampusSphere AI — Seed Script
 * Run: node server/seed.js
 * Seeds demo users + student profile data for testing
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const User      = require('./models/User');
const Student   = require('./models/Student');
const Faculty   = require('./models/Faculty');

const SALT_ROUNDS = 10;

const seedUsers = [
  {
    name:       'Arjun Sharma',
    email:      'student@campus.edu',
    password:   'student123',
    role:       'student',
    rollNumber: '20240001',
  },
  {
    name:     'Dr. Priya Mehta',
    email:    'faculty@campus.edu',
    password: 'faculty123',
    role:     'faculty',
  },
  {
    name:     'Admin User',
    email:    'admin@campus.edu',
    password: 'admin1234',
    role:     'admin',
  },
  {
    name:     'Ramesh Sharma',
    email:    'parent@campus.edu',
    password: 'parent123',
    role:     'parent',
  },
];

const studentAttendance = [
  { subject: 'Data Structures',     code: 'CS201', attended: 42, total: 50 },   // 84%
  { subject: 'Database Systems',    code: 'CS202', attended: 38, total: 50 },   // 76%
  { subject: 'Web Development',     code: 'CS203', attended: 45, total: 50 },   // 90%
  { subject: 'Computer Networks',   code: 'CS204', attended: 28, total: 50 },   // 56%
  { subject: 'Operating Systems',   code: 'CS205', attended: 40, total: 50 },   // 80%
];

const studentResults = [
  { subject: 'Data Structures',   code: 'CS201', marks: 82, maxMarks: 100, grade: 'A' },
  { subject: 'Database Systems',  code: 'CS202', marks: 74, maxMarks: 100, grade: 'B+' },
  { subject: 'Web Development',   code: 'CS203', marks: 91, maxMarks: 100, grade: 'A+' },
  { subject: 'Computer Networks', code: 'CS204', marks: 55, maxMarks: 100, grade: 'C' },
  { subject: 'Operating Systems', code: 'CS205', marks: 78, maxMarks: 100, grade: 'B+' },
];

const seed = async () => {
  try {
    await connectDB();

    // ── Wipe existing data for clean seed ──────────────────────
    console.log('🗑️  Clearing existing seed data...');
    const emails = seedUsers.map((u) => u.email);
    const existingUsers = await User.find({ email: { $in: emails } });
    const existingUserIds = existingUsers.map((u) => u._id);

    await User.deleteMany({ email: { $in: emails } });
    await Student.deleteMany({ userId: { $in: existingUserIds } });
    await Faculty.deleteMany({ userId: { $in: existingUserIds } });
    console.log('✅ Old seed data cleared');

    // ── Hash passwords and create users ───────────────────────
    console.log('👤 Creating users...');
    const createdUsers = {};

    for (const userData of seedUsers) {
      const hashed = await bcrypt.hash(userData.password, SALT_ROUNDS);
      const user = await User.create({
        name:       userData.name,
        email:      userData.email,
        password:   hashed,
        role:       userData.role,
        rollNumber: userData.rollNumber || null,
      });
      createdUsers[userData.role] = user;
      console.log(`  ✅ Created [${userData.role}]: ${userData.email}`);
    }

    // ── Create Student profile for Arjun Sharma ───────────────
    console.log('📚 Creating student profile...');
    await Student.create({
      userId:     createdUsers['student']._id,
      rollNumber: '20240001',
      branch:     'Computer Science & Engineering',
      semester:   4,
      year:       2,
      attendance: studentAttendance,
      results:    studentResults,
      fees: {
        total:    120000,
        paid:     80000,
        due:      40000,
        lastPaid: new Date('2026-01-15'),
      },
      announcements: [
        {
          title: 'Mid-Semester Exams Schedule Released',
          body:  'Mid-semester exams will be held from April 20–30. Check the exam portal for details.',
          date:  new Date('2026-04-01'),
        },
        {
          title: 'Campus Placement Drive — TCS',
          body:  'TCS will be visiting campus on April 25. Register by April 18 via the placement portal.',
          date:  new Date('2026-03-28'),
        },
      ],
    });
    console.log('  ✅ Student profile created for Arjun Sharma (20240001)');

    // ── Create Faculty profile for Dr. Priya Mehta ────────────
    console.log('🏫 Creating faculty profile...');
    await Faculty.create({
      userId:     createdUsers['faculty']._id,
      department: 'Computer Science & Engineering',
      employeeId: 'FAC-2024-001',
      subjects:   ['Data Structures', 'Algorithm Design', 'Web Development'],
      timetable: [
        { day: 'Monday',    time: '9:00 AM - 10:00 AM',  subject: 'Data Structures', room: 'CS-101' },
        { day: 'Monday',    time: '11:00 AM - 12:00 PM', subject: 'Web Development', room: 'CS-Lab-2' },
        { day: 'Tuesday',   time: '10:00 AM - 11:00 AM', subject: 'Data Structures', room: 'CS-101' },
        { day: 'Wednesday', time: '9:00 AM - 10:00 AM',  subject: 'Algorithm Design', room: 'CS-102' },
        { day: 'Thursday',  time: '11:00 AM - 12:00 PM', subject: 'Web Development', room: 'CS-Lab-2' },
        { day: 'Friday',    time: '10:00 AM - 11:00 AM', subject: 'Algorithm Design', room: 'CS-102' },
      ],
    });
    console.log('  ✅ Faculty profile created for Dr. Priya Mehta');

    // ── Summary ───────────────────────────────────────────────
    console.log('\n🎉 Seeding complete! Demo credentials:');
    console.log('┌─────────────────┬──────────────────────────┬─────────────┐');
    console.log('│ Role            │ Email                    │ Password    │');
    console.log('├─────────────────┼──────────────────────────┼─────────────┤');
    console.log('│ Student         │ student@campus.edu       │ student123  │');
    console.log('│ Faculty         │ faculty@campus.edu       │ faculty123  │');
    console.log('│ Admin           │ admin@campus.edu         │ admin1234   │');
    console.log('│ Parent          │ parent@campus.edu        │ parent123   │');
    console.log('└─────────────────┴──────────────────────────┴─────────────┘');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
