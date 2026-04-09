<div align="center">

<!-- <img src="https://raw.githubusercontent.com/Abhinikesh/AI-Enabled_Campus_Help_Desk/main/campussphere-ai/client/public/favicon.svg" width="80" alt="CampusSphere AI Logo" /> -->

# 🎓 CampusSphere AI

### Your AI-Powered Smart Campus Platform

*One platform for students, faculty, parents and admin. Powered by multi-agent AI for real answers, real fast.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[🌐 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](https://github.com/Abhinikesh/AI-Enabled_Campus_Help_Desk/issues)

</div>

---

## 📸 Screenshots

### 🌟 Splash Screen
![Splash Screen](campussphere-ai/Splash.png)

---

### 🏠 Home Page
![Home Page](campussphere-ai/home.png)

---

### 👥 Role Selection
![Who Are You](campussphere-ai/Who_are_you.png)

---

### 🎓 Student Dashboard
![Student Dashboard](campussphere-ai/student_dashboard.png)

---

### 📊 Student Results & Announcements
![Student Dashboard 2](campussphere-ai/student_dashboard2.png)

---

### 🤖 AI Multi-Agent Help Desk
![AI Agent](campussphere-ai/AI_Agent.png)

---

### 🗺️ 360° Virtual Campus Tour
![Virtual Tour](campussphere-ai/Virtual_Tour_360.png)

---

### 📁 Academic Drive
![Drive](campussphere-ai/drive.png)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **Multi-Agent AI** | 4 specialized AI agents — Academic, Admin, Navigation & Complaint |
| 🗺️ **360° Virtual Tour** | Explore campus locations virtually with AI guide |
| 📊 **Real-Time Attendance** | Live tracking with circular progress rings & low-attendance alerts |
| 📁 **Academic Drive** | Upload, download & share academic files with real storage |
| 📝 **Smart Complaints** | Raise, track and resolve campus issues with timeline |
| 🔐 **Role-Based Access** | 5 roles — Student, Faculty, Admin, Parent, New Admission |
| 📢 **Announcements** | Faculty posts announcements, students & parents receive them |
| 📱 **Fully Responsive** | Works perfectly on desktop, tablet and mobile |

---

## 🎭 Roles & Access

┌─────────────────┬──────────────────────────────────────────────┐
│ Role            │ Access                                        │
├─────────────────┼──────────────────────────────────────────────┤
│ 🎓 Student      │ Dashboard, Attendance, Exams, Results,        │
│                 │ AI Help Desk, Virtual Tour, Drive, Complaints │
├─────────────────┼──────────────────────────────────────────────┤
│ 👨‍🏫 Faculty     │ Dashboard, Timetable, Subjects, Announcements,│
│                 │ AI Help Desk, Virtual Tour, Complaints        │
├─────────────────┼──────────────────────────────────────────────┤
│ 🛡️ Admin        │ Analytics, All Complaints, Announcements,    │
│                 │ Student Management, Stats                     │
├─────────────────┼──────────────────────────────────────────────┤
│ 👨‍👧 Parent       │ Child Progress, Calendar, AI Help Desk,      │
│                 │ Virtual Tour, Contact Directory               │
├─────────────────┼──────────────────────────────────────────────┤
│ 📋 New Admission│ Programs, Admission Steps, FAQs,             │
│                 │ Important Dates, Campus Highlights            │
└─────────────────┴──────────────────────────────────────────────┘

---

## 🤖 AI Agents

┌─────────────────────────────────────────────────────────────┐
│                    CAMPUS AI ASSISTANT                       │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  📚 Academic │  🏛️ Admin    │  🗺️ Navigate │  📝 Complaint  │
│    Agent     │    Agent     │    Agent     │    Agent       │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Timetable    │ Fees         │ Room Finding │ Raise Issues   │
│ Results      │ ID Card      │ Directions   │ Track Status   │
│ Attendance   │ Documents    │ Campus Map   │ Grievances     │
│ Exams        │ Certificates │ Locations    │ Resolution     │
└──────────────┴──────────────┴──────────────┴────────────────┘

---

## 🏗️ Tech Stack

Frontend          Backend           Database          AI
─────────         ───────           ────────          ──
React + Vite      Node.js           MongoDB           Gemini 1.5 Flash
Tailwind CSS      Express.js        Mongoose          Multi-Agent System
React Router      JWT Auth          Seed Data         Auto-Detection
Framer Motion     Bcrypt            Real Storage      Hindi/English
Lucide Icons      Multer            Drive Files       Quick Ask
Axios             Cookie Parser     Complaints        Chat History

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local)
- Gemini API Key from [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Abhinikesh/AI-Enabled_Campus_Help_Desk.git
cd AI-Enabled_Campus_Help_Desk/campussphere-ai

# 2. Install all dependencies
npm run install-all

# 3. Add your Gemini API key
# Open server/.env and replace:
# GEMINI_API_KEY=your_actual_gemini_key_here

# 4. Start MongoDB
brew services start mongodb-community

# 5. Seed the database
cd server && node seed.js && cd ..

# 6. Start the project
npm run dev
```

### Open in Browser

---

## 🔐 Demo Credentials

| Role | Login | Password |
|------|-------|----------|
| 🎓 Student | Roll Number: `20240001` | `student123` |
| 👨‍🏫 Faculty | `faculty@campus.edu` | `faculty123` |
| 🛡️ Admin | `admin@campus.edu` | `admin1234` |
| 👨‍👧 Parent | `parent@campus.edu` | `parent123` |
| 📋 Visitor | Name + Purpose | *(no password)* |

---

## 📁 Project Structure

---

## 🔌 API Endpoints

AUTH
POST   /api/auth/login          Login any role
POST   /api/auth/logout         Logout
GET    /api/auth/me             Get current user
STUDENT
GET    /api/student/profile     Student profile
GET    /api/student/attendance  Attendance data
GET    /api/student/results     Results & CGPA
GET    /api/student/exams       Exam schedule
GET    /api/student/fees        Fee details
GET    /api/student/complaints  My complaints
POST   /api/student/complaints  Raise complaint
FACULTY
GET    /api/faculty/timetable   Today's schedule
GET    /api/faculty/subjects    My subjects
POST   /api/faculty/announcements  Post announcement
ADMIN
GET    /api/admin/stats         Campus analytics
GET    /api/admin/complaints    All complaints
PATCH  /api/admin/complaints/:id/resolve  Resolve
DRIVE
GET    /api/drive               Get files
POST   /api/drive/upload        Upload file
GET    /api/drive/download/:id  Download file
GET    /api/drive/share/:id     Get share link
AI
POST   /api/ai/chat             Chat with AI agents


---

## 🌟 Key Highlights

- ✅ **Real AI Chat** powered by Google Gemini 1.5 Flash
- ✅ **Real File Upload/Download** with progress tracking
- ✅ **Real Database** with MongoDB — no fake data after seed
- ✅ **JWT Authentication** with secure httpOnly cookies
- ✅ **Role-Based Protection** — wrong role = redirect, not crash
- ✅ **Announcement System** — faculty posts, students receive
- ✅ **Complaint Tracking** with full timeline
- ✅ **Download Counter** tracks real downloads
- ✅ **Share Links** copy to clipboard instantly
- ✅ **Fully Responsive** — mobile, tablet, desktop

---

## 🛠️ Environment Variables

```env
# server/.env
MONGODB_URI=mongodb://localhost:27017/campussphere
JWT_SECRET=campussphere_secret_key_2026
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5001
```

---

## 📜 License

MIT License — feel free to use, modify and distribute.

---

<div align="center">

**Built with ❤️ for Smart Campuses**

*CampusSphere AI — Where Technology Meets Education*

⭐ Star this repo if you found it useful!

</div>
