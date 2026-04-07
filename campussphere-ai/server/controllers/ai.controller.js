const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

function detectAgent(message) {
  const msg = message.toLowerCase();
  const academic = ['timetable','result','marks','attendance','exam','subject','course','syllabus','grade','cgpa','semester','lecture'];
  const admin = ['fee','id card','certificate','document','hostel','bus','library','payment','receipt','admission','card'];
  const navigation = ['where','location','room','building','department','lab','office','canteen','direction','find','map','how to reach'];
  const complaint = ['complaint','issue','problem','broken','not working','report','raise','grievance','request','fix'];
  
  if (complaint.some(k => msg.includes(k))) return 'complaint';
  if (navigation.some(k => msg.includes(k))) return 'navigation';
  if (admin.some(k => msg.includes(k))) return 'admin';
  if (academic.some(k => msg.includes(k))) return 'academic';
  return 'academic'; // default
}

const getSystemPrompt = (agent, role, name) => {
  const base = `Current user role: ${role}. User name: ${name}.`;
  
  switch(agent) {
    case 'academic':
      return `You are the Academic Agent of CampusSphere AI, a smart campus helpdesk. You help students and faculty with academic queries including timetables, results, attendance, exams, syllabus, CGPA, and course information. Always respond in a friendly, helpful, structured way. Use bullet points for lists. Keep responses concise and relevant to campus academics. ${base}`;
    case 'admin':
      return `You are the Admin Agent of CampusSphere AI. You assist with administrative queries including fee payment, ID cards, certificates, documents, hostel, library, bus pass, and general administration. Always respond helpfully and direct users to the right office when needed. ${base}`;
    case 'navigation':
      return `You are the Navigation Agent of CampusSphere AI. You help users find locations on campus including rooms, labs, departments, offices, canteen, library, hostels, and other facilities. Provide clear step-by-step directions. Campus layout: Main Gate -> Admin Block (left) -> Academic Block A (straight) -> Academic Block B (right) -> Library (far right) -> Labs (behind Academic A) -> Canteen (center) -> Hostels (back campus). ${base}`;
    case 'complaint':
      return `You are the Complaint Agent of CampusSphere AI. You help users raise, track and resolve complaints. Guide users through the complaint process, collect complaint details, and provide expected resolution timelines. Categories: Academic, Administrative, Hostel, Infrastructure, Other. Always be empathetic and professional. ${base}`;
    default:
      return `You are CampusSphere AI. Help the user. ${base}`;
  }
};

exports.chat = async (req, res) => {
  try {
    const { message, history = [], agent } = req.body;
    // mock user from req.user if auth middleware exists
    const user = req.user || { role: 'student', name: 'User' };
    
    // Auto detect if not provided
    const detectedAgent = agent || detectAgent(message);
    const systemPrompt = getSystemPrompt(detectedAgent, user.role, user.name);
    
    // Format history for Gemini
    const geminiHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemPrompt
    });

    const chatSession = model.startChat({ history: geminiHistory });
    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    res.json({ reply: responseText, agent: detectedAgent });
  } catch (error) {
    console.error("AI Chat Error:", error.message || error);
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('your') || error?.message?.includes('API key')) {
       return res.json({ reply: "Add your Gemini API key to server/.env to enable AI", agent: agent || 'academic' });
    }
    res.status(500).json({ error: "Failed to process chat message." });
  }
};
