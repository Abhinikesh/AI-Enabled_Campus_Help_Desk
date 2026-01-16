// Dummy data for CampusSphere AI
const campusData = {
  // AI Agent Responses
  aiResponses: {
    academic: {
      "exam schedule": "Mid-semester exams are from March 15-25. Check the student portal for the detailed timetable.",
      "course registration": "Course registration opens February 1st. You can register online or visit the Academic Office.",
      "grades": "Grades are available on the student portal. Contact your course coordinator if you have concerns.",
      "library hours": "Library hours: Mon-Fri 8 AM - 10 PM, Weekends 9 AM - 6 PM.",
      "default": "I can help with exam schedules, course registration, grades, and library info. What do you need?"
    },
    admin: {
      "fee payment": "Pay fees online through the portal or visit Finance Office (Building A, Room 101). Office hours: 9 AM - 5 PM.",
      "id card": "ID cards are processed at Admin Office. Bring 2 passport photos and your admission letter.",
      "certificates": "Certificates can be collected from Admin Office. Processing takes 3-5 working days.",
      "default": "I can help with fees, ID cards, certificates, and hostel allocation. How can I assist?"
    },
    navigation: {
      "library": "The Central Library is in Building B, Ground Floor. From Main Gate: walk straight 150m, turn left near Admin Block. It has 50,000+ books, digital resources, and quiet study spaces.",
      "canteen": "Canteen is in Building C, near the sports complex. Open 8 AM - 8 PM. Serves vegetarian and non-vegetarian meals.",
      "hostel": "Hostels are in the North Block. From Main Gate: walk straight 300m, turn left at sports complex. Features AC rooms, WiFi, mess, and common rooms.",
      "admin office": "Admin Office is in Building A, Room 101, Ground Floor. From Main Gate: walk straight 100m, it's on your right. Handles fees, ID cards, and certificates.",
      "cs dept": "Computer Science Department is in Building D. From Main Gate: walk straight 200m, turn right at fountain. Houses advanced labs and AI research facility.",
      "auditorium": "Main Auditorium is in Building C. From Main Gate: walk straight 180m, turn right near library. Seats 500+ with modern sound and projection systems.",
      "facilities": "Campus facilities include library, labs, hostels, canteen, sports complex, auditorium, and admin services. What would you like to know about?",
      "directions": "I can provide step-by-step directions between any campus locations. Tell me where you are and where you want to go.",
      "default": "I can guide you to library, CS department, admin office, hostels, auditorium, canteen, and labs. Where do you need to go?"
    },
    complaint: {
      "wifi": "Try restarting your device and reconnecting. If it persists, contact IT Support at ext. 1234.",
      "water": "Report water issues to Maintenance Office immediately. Emergency: ext. 5678.",
      "electricity": "Contact Electrical Maintenance at ext. 9012. For emergencies, call Security: ext. 0000.",
      "default": "I can help with WiFi, water, electricity, cleanliness, and infrastructure issues. What's the problem?"
    },
    placement: {
      "internship": "Internships are posted on the Placement Portal. Visit Placement Cell in Building D, Room 205.",
      "resume": "Resume workshops every Friday at 3 PM in the Career Development Center.",
      "companies": "Top recruiters: Google, Microsoft, Amazon, TCS, Infosys. Check Placement Portal for details.",
      "default": "I can help with internships, resume building, company info, and placement schedules. What do you need?"
    }
  },

  // FAQs
  faqs: [
    {
      question: "How do I access the student portal?",
      answer: "Visit portal.campus.edu and login with your student ID and password."
    },
    {
      question: "Where can I find exam results?",
      answer: "Results are published on the student portal under 'Academic Records' section."
    },
    {
      question: "How do I apply for hostel accommodation?",
      answer: "Submit the hostel application form at the Admin Office or apply online through the portal."
    },
    {
      question: "What are the library timings?",
      answer: "Library is open Monday-Friday: 8 AM - 10 PM, Weekends: 9 AM - 6 PM."
    },
    {
      question: "How can I contact the placement cell?",
      answer: "Visit Building D, Room 205 or email placement@campus.edu"
    }
  ],

  // Complaints Data
  complaints: [
    {
      id: "TKT-2024-001",
      category: "WiFi",
      location: "Hostel Block A",
      description: "No internet connectivity in room 205",
      status: "Open",
      date: "2024-02-10",
      aiSuggestion: "Try restarting your router. If issue persists, contact IT Support."
    },
    {
      id: "TKT-2024-002",
      category: "Water",
      location: "Hostel Block B",
      description: "Water supply interrupted",
      status: "In Progress",
      date: "2024-02-09",
      aiSuggestion: "Maintenance team has been notified. Expected resolution: 2 hours."
    },
    {
      id: "TKT-2024-003",
      category: "Electricity",
      location: "Building C",
      description: "Flickering lights in corridor",
      status: "Resolved",
      date: "2024-02-08",
      aiSuggestion: "Issue resolved. Electrical team replaced faulty wiring."
    },
    {
      id: "TKT-2024-004",
      category: "Cleanliness",
      location: "Canteen",
      description: "Washroom needs cleaning",
      status: "Open",
      date: "2024-02-11",
      aiSuggestion: "Housekeeping team will address this within 1 hour."
    }
  ],

  // Analytics Data
  analytics: {
    totalQueries: 1247,
    mostUsedAgent: "Academic Agent",
    activeComplaints: 12,
    dailyQueries: [
      { day: "Mon", count: 180 },
      { day: "Tue", count: 210 },
      { day: "Wed", count: 195 },
      { day: "Thu", count: 225 },
      { day: "Fri", count: 190 },
      { day: "Sat", count: 150 },
      { day: "Sun", count: 97 }
    ],
    issueCategories: [
      { category: "WiFi", count: 45 },
      { category: "Water", count: 32 },
      { category: "Electricity", count: 28 },
      { category: "Cleanliness", count: 25 },
      { category: "Other", count: 15 }
    ],
    recentComplaints: [
      {
        id: "TKT-2024-005",
        category: "WiFi",
        status: "Open",
        date: "2024-02-11",
        priority: "High"
      },
      {
        id: "TKT-2024-006",
        category: "Water",
        status: "In Progress",
        date: "2024-02-11",
        priority: "High"
      },
      {
        id: "TKT-2024-007",
        category: "Electricity",
        status: "Resolved",
        date: "2024-02-10",
        priority: "Medium"
      }
    ]
  },

  // Campus Locations for Tour
  locations: [
    {
      id: "library",
      name: "Central Library",
      description: "State-of-the-art library with 50,000+ books and digital resources",
      position: "0 1.6 -3",
      image: "assets/images/location-library.jpg",
      facilities: ["Reading halls", "Digital resources", "Study rooms", "Computer lab", "Quiet zones"],
      timings: "Monday-Friday: 8 AM - 10 PM, Weekends: 9 AM - 6 PM",
      aiDescription: "The Central Library is our main knowledge hub with over 50,000 books, digital databases, and quiet study spaces. It features modern reading halls, computer labs, and dedicated study rooms for group work."
    },
    {
      id: "cs-dept",
      name: "Computer Science Department",
      description: "Modern labs with latest technology and expert faculty",
      position: "3 1.6 0",
      image: "assets/images/location-cs.jpg",
      facilities: ["Computer labs", "AI research lab", "Project rooms", "Faculty offices", "Seminar hall"],
      timings: "Monday-Friday: 9 AM - 6 PM",
      aiDescription: "The Computer Science Department houses advanced computer labs, an AI research facility, and modern project rooms. It's home to expert faculty and cutting-edge technology for research and learning."
    },
    {
      id: "admin",
      name: "Administration Office",
      description: "Central hub for all administrative services",
      position: "-3 1.6 0",
      image: "assets/images/location-admin.jpg",
      facilities: ["Student services", "Fee payment", "ID card office", "Certificate services", "Help desk"],
      timings: "Monday-Friday: 9 AM - 5 PM",
      aiDescription: "The Administration Office is your one-stop for all administrative needs including fee payments, ID cards, certificates, and student services. Friendly staff are available to assist you."
    },
    {
      id: "hostel",
      name: "Student Hostels",
      description: "Comfortable accommodation with all modern amenities",
      position: "0 1.6 3",
      image: "assets/images/location-hostel.jpg",
      facilities: ["AC rooms", "WiFi", "Mess facility", "Common rooms", "Laundry"],
      timings: "24/7 access for residents",
      aiDescription: "Our student hostels provide comfortable accommodation with modern amenities including AC rooms, high-speed WiFi, mess facilities, common rooms for recreation, and laundry services."
    },
    {
      id: "auditorium",
      name: "Main Auditorium",
      description: "Large event space for conferences and cultural events",
      position: "-2 1.6 2",
      image: "assets/images/location-auditorium.jpg",
      facilities: ["Seating for 500+", "Stage", "Sound system", "Projection", "Green room"],
      timings: "Available for booking",
      aiDescription: "The Main Auditorium is a spacious venue with seating for 500+ people, perfect for conferences, cultural events, guest lectures, and ceremonies. It features modern sound and projection systems."
    }
  ],

  // Directions between locations
  directions: {
    "main-gate-library": [
      "Enter from Main Gate",
      "Walk straight for 150 meters",
      "Turn left near Admin Block",
      "Library is on your right (Building B)"
    ],
    "main-gate-cs-dept": [
      "Enter from Main Gate",
      "Walk straight for 200 meters",
      "Turn right at the fountain",
      "CS Department is Building D on your left"
    ],
    "main-gate-admin": [
      "Enter from Main Gate",
      "Walk straight for 100 meters",
      "Admin Office is Building A on your right"
    ],
    "main-gate-hostel": [
      "Enter from Main Gate",
      "Walk straight for 300 meters",
      "Turn left at the sports complex",
      "Hostels are in the North Block ahead"
    ],
    "main-gate-auditorium": [
      "Enter from Main Gate",
      "Walk straight for 180 meters",
      "Turn right near the library",
      "Auditorium is Building C on your left"
    ],
    "hostel-library": [
      "Exit from Hostel Block",
      "Walk towards the main campus",
      "Turn right at the sports complex",
      "Continue straight for 200 meters",
      "Library is Building B on your left"
    ],
    "hostel-cs-dept": [
      "Exit from Hostel Block",
      "Walk towards main campus",
      "Turn left at the fountain",
      "CS Department is Building D ahead"
    ],
    "admin-library": [
      "Exit from Admin Office (Building A)",
      "Walk straight for 50 meters",
      "Library is Building B on your right"
    ]
  },

  // Location FAQs
  locationFAQs: {
    library: [
      { q: "What are the library timings?", a: "Monday-Friday: 8 AM - 10 PM, Weekends: 9 AM - 6 PM" },
      { q: "Can I borrow books?", a: "Yes, students can borrow up to 5 books for 14 days. Renew online or visit the circulation desk." },
      { q: "Is WiFi available?", a: "Yes, high-speed WiFi is available throughout the library." }
    ],
    "cs-dept": [
      { q: "What labs are available?", a: "We have computer labs, AI research lab, and project rooms with latest equipment." },
      { q: "Can I use the labs after hours?", a: "Lab access is available during department hours. Special permission required for after-hours use." }
    ],
    admin: [
      { q: "What services are available?", a: "Fee payment, ID cards, certificates, transcripts, and general student services." },
      { q: "What documents do I need?", a: "Bring your student ID and relevant documents. Check the website for specific requirements." }
    ],
    hostel: [
      { q: "What facilities are available?", a: "AC rooms, WiFi, mess, common rooms, laundry, and 24/7 security." },
      { q: "How do I apply for hostel?", a: "Submit application online or visit Admin Office with required documents." }
    ],
    auditorium: [
      { q: "How do I book the auditorium?", a: "Contact the Admin Office with event details and required dates for booking." },
      { q: "What's the capacity?", a: "The auditorium can seat 500+ people comfortably." }
    ]
  },

  // Programs Offered
  programs: [
    {
      id: 1,
      name: "B.Tech Computer Science",
      image: "assets/images/mriirs_img.webp"
    },
    {
      id: 2,
      name: "B.Tech Artificial Intelligence",
      image: "assets/images/program-ai.jpg"
    },
    {
      id: 3,
      name: "MBA",
      image: "assets/images/program-mba.jpg"
    },
    {
      id: 4,
      name: "BBA",
      image: "assets/images/program-bba.jpg"
    },
    {
      id: 5,
      name: "B.Sc Data Science",
      image: "assets/images/program-ds.jpg"
    },
    {
      id: 6,
      name: "M.Tech",
      image: "assets/images/program-mtech.jpg"
    }
  ],

  // Placement Statistics
  placements: {
    highestPackage: 4500000,
    averagePackage: 850000,
    companiesVisited: 180,
    placementRate: 94
  },

  // What's New / News
  news: [
    {
      id: 1,
      title: "Hackathon 2026",
      image: "assets/images/news-hackathon.jpg"
    },
    {
      id: 2,
      title: "AI Research Lab Launch",
      image: "assets/images/news-ai-lab.jpg"
    },
    {
      id: 3,
      title: "Cultural Fest",
      image: "assets/images/news-cultural.jpg"
    },
    {
      id: 4,
      title: "Sports Meet",
      image: "assets/images/news-sports.jpg"
    },
    {
      id: 5,
      title: "Industry Visit",
      image: "assets/images/news-industry.jpg"
    },
    {
      id: 6,
      title: "Guest Lecture",
      image: "assets/images/news-lecture.jpg"
    }
  ],

  // Institution Timeline
  timeline: [
    {
      id: 1,
      year: "2002",
      title: "Established",
      description: "Institution founded with vision for excellence",
      image: "assets/images/timeline-2002.jpg"
    },
    {
      id: 2,
      year: "2022",
      title: "20+ Years of Excellence",
      description: "Two decades of academic excellence and innovation",
      image: "assets/images/timeline-2022.jpg"
    },
    {
      id: 3,
      year: "2020",
      title: "NAAC Accreditation",
      description: "Achieved NAAC A+ grade accreditation",
      image: "assets/images/timeline-naac.jpg"
    },
    {
      id: 4,
      year: "2024",
      title: "Global Alumni Network",
      description: "10,000+ alumni across 50+ countries",
      image: "assets/images/timeline-alumni.jpg"
    },
    {
      id: 5,
      year: "2025",
      title: "Industry Partnerships",
      description: "Partnerships with 200+ leading companies",
      image: "assets/images/timeline-partners.jpg"
    }
  ],

  // Class Schedules
  classSchedules: {
    student: [
      {
        id: 1,
        className: "Data Structures",
        subjectCode: "CS201",
        timeFrom: "09:00",
        timeTo: "10:30",
        room: "Lab A-101",
        status: "upcoming"
      },
      {
        id: 2,
        className: "Database Management",
        subjectCode: "CS203",
        timeFrom: "11:00",
        timeTo: "12:30",
        room: "Room B-205",
        status: "upcoming"
      },
      {
        id: 3,
        className: "Web Development",
        subjectCode: "CS205",
        timeFrom: "14:00",
        timeTo: "15:30",
        room: "Lab C-301",
        status: "upcoming"
      }
    ],
    faculty: [
      {
        id: 1,
        className: "Data Structures",
        subjectCode: "CS201",
        timeFrom: "09:00",
        timeTo: "10:30",
        room: "Lab A-101",
        status: "upcoming",
        batch: "CSE 3rd Year"
      },
      {
        id: 2,
        className: "Database Management",
        subjectCode: "CS203",
        timeFrom: "11:00",
        timeTo: "12:30",
        room: "Room B-205",
        status: "upcoming",
        batch: "CSE 3rd Year"
      },
      {
        id: 3,
        className: "Advanced Algorithms",
        subjectCode: "CS401",
        timeFrom: "15:00",
        timeTo: "16:30",
        room: "Lab D-102",
        status: "upcoming",
        batch: "CSE 4th Year"
      }
    ]
  },

  // Daily Plans
  dailyPlans: {
    student: [
      { id: 1, task: "Submit Data Structures assignment", type: "assignment", completed: false },
      { id: 2, task: "Prepare for Database quiz", type: "study", completed: false },
      { id: 3, task: "Group project meeting at 4 PM", type: "meeting", completed: false },
      { id: 4, task: "Library visit for research paper", type: "research", completed: false }
    ],
    faculty: [
      { id: 1, task: "Prepare lecture slides for CS201", type: "preparation", completed: false },
      { id: 2, task: "Review assignment submissions", type: "grading", completed: false },
      { id: 3, task: "Department meeting at 2 PM", type: "meeting", completed: false },
      { id: 4, task: "Update course materials", type: "admin", completed: false }
    ]
  },

  // Drive Files (simulated)
  driveFiles: {
    student: [],
    faculty: []
  },

  // Attendance Data (Students Only)
  attendance: {
    student: [
      {
        subjectCode: "CS201",
        subjectName: "Data Structures",
        classesAttended: 42,
        totalClasses: 50,
        percentage: 84
      },
      {
        subjectCode: "CS203",
        subjectName: "Database Management",
        classesAttended: 38,
        totalClasses: 50,
        percentage: 76
      },
      {
        subjectCode: "CS205",
        subjectName: "Web Development",
        classesAttended: 45,
        totalClasses: 50,
        percentage: 90
      },
      {
        subjectCode: "CS207",
        subjectName: "Computer Networks",
        classesAttended: 28,
        totalClasses: 50,
        percentage: 56
      },
      {
        subjectCode: "CS209",
        subjectName: "Operating Systems",
        classesAttended: 40,
        totalClasses: 50,
        percentage: 80
      }
    ]
  },

  // Exam Schedule (Students Only)
  examSchedule: {
    student: [
      {
        id: 1,
        subjectCode: "CS201",
        subjectName: "Data Structures",
        examDate: "2024-03-15",
        time: "09:00 - 12:00",
        room: "Hall A-101"
      },
      {
        id: 2,
        subjectCode: "CS203",
        subjectName: "Database Management",
        examDate: "2024-03-17",
        time: "09:00 - 12:00",
        room: "Hall B-205"
      },
      {
        id: 3,
        subjectCode: "CS205",
        subjectName: "Web Development",
        examDate: "2024-03-19",
        time: "14:00 - 17:00",
        room: "Lab C-301"
      },
      {
        id: 4,
        subjectCode: "CS207",
        subjectName: "Computer Networks",
        examDate: "2024-03-21",
        time: "09:00 - 12:00",
        room: "Hall A-102"
      },
      {
        id: 5,
        subjectCode: "CS209",
        subjectName: "Operating Systems",
        examDate: "2024-03-23",
        time: "14:00 - 17:00",
        room: "Hall B-206"
      }
    ]
  },

  // Exam Results (Students Only)
  examResults: {
    student: [
      {
        id: 1,
        subjectCode: "CS201",
        subjectName: "Data Structures",
        internalMarks: 28,
        externalMarks: 65,
        total: 93,
        grade: "A+",
        status: "Pass"
      },
      {
        id: 2,
        subjectCode: "CS203",
        subjectName: "Database Management",
        internalMarks: 26,
        externalMarks: 58,
        total: 84,
        grade: "A",
        status: "Pass"
      },
      {
        id: 3,
        subjectCode: "CS205",
        subjectName: "Web Development",
        internalMarks: 30,
        externalMarks: 72,
        total: 102,
        grade: "A+",
        status: "Pass"
      },
      {
        id: 4,
        subjectCode: "CS207",
        subjectName: "Computer Networks",
        internalMarks: 22,
        externalMarks: 42,
        total: 64,
        grade: "C",
        status: "Pass"
      },
      {
        id: 5,
        subjectCode: "CS209",
        subjectName: "Operating Systems",
        internalMarks: 27,
        externalMarks: 60,
        total: 87,
        grade: "A",
        status: "Pass"
      }
    ]
  },

  // Parent Dashboard Data
  parentDashboard: {
    announcements: [
      {
        id: 1,
        title: "Parent-Teacher Meeting",
        date: "2024-03-25",
        content: "Annual parent-teacher meeting scheduled on March 25, 2024 at 10:00 AM in the main auditorium."
      },
      {
        id: 2,
        title: "Fee Payment Reminder",
        date: "2024-03-20",
        content: "Please ensure fee payment is completed before March 30, 2024 to avoid late fees."
      },
      {
        id: 3,
        title: "Summer Break Notice",
        date: "2024-04-15",
        content: "Summer break will commence from April 15, 2024. Classes resume on June 1, 2024."
      }
    ],
    academicCalendar: [
      { date: "2024-03-15", event: "Mid-Semester Exams Begin" },
      { date: "2024-03-25", event: "Parent-Teacher Meeting" },
      { date: "2024-04-01", event: "Holiday - Spring Break" },
      { date: "2024-04-15", event: "Summer Break Starts" },
      { date: "2024-06-01", event: "Classes Resume" }
    ],
    guidance: [
      {
        title: "Grading System",
        content: "Grades are awarded on a 10-point scale: A+ (90-100), A (80-89), B (70-79), C (60-69), D (50-59), F (<50)"
      },
      {
        title: "Attendance Policy",
        content: "Students must maintain minimum 75% attendance to be eligible for examinations. Medical certificates are accepted for legitimate absences."
      },
      {
        title: "Examination Rules",
        content: "Students must carry ID card to all exams. Use of mobile phones or unauthorized materials is strictly prohibited."
      }
    ],
    contacts: [
      { department: "Academic Office", phone: "+91-XXX-XXXX-XXX", email: "academic@campus.edu" },
      { department: "Administration", phone: "+91-XXX-XXXX-XXX", email: "admin@campus.edu" },
      { department: "Student Affairs", phone: "+91-XXX-XXXX-XXX", email: "studentaffairs@campus.edu" },
      { department: "Fee Payment", phone: "+91-XXX-XXXX-XXX", email: "fees@campus.edu" }
    ]
  }
};
