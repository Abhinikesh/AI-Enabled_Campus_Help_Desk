const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/ai/chat
const chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // System context for campus helpdesk
    const systemPrompt = `You are CampusSphere AI, an intelligent campus helpdesk assistant for a college. 
You help students, faculty, parents, and new admissions with:
- Academic queries (attendance, results, exams, timetables)
- Administrative processes (fee payment, admissions, documents)
- Campus facilities and services
- General college information

Current user role: ${req.user?.role || 'guest'}
Current user name: ${req.user?.name || 'User'}

Always be helpful, concise, and professional. If you don't know something specific about the institution, say so honestly.`;

    // Build chat messages
    const chatHistory = history.map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Understood. I am CampusSphere AI, ready to assist campus members.' }] },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    console.log(`✅ AI chat response generated for userId: ${req.user?.userId}`);
    res.status(200).json({ success: true, reply });
  } catch (err) {
    console.error('❌ AI chat error:', err.message);
    res.status(500).json({ success: false, message: 'AI service error. Please try again.' });
  }
};

module.exports = { chat };
