# Interview AI — AI-Powered Interview Preparation Platform

A full-stack MERN application that helps job seekers prepare for technical interviews. Upload your resume, describe yourself, and paste a target job description — the app uses Google's Gemini AI to generate a personalized interview report: a role-match score, tailored technical and behavioral questions with model answers, a skill-gap analysis, and a day-wise preparation roadmap.

> Built as a placement-ready portfolio project to demonstrate full-stack development, third-party AI API integration, and structured/schema-validated LLM output.

---

## ✨ Features

- 🔐 **Secure authentication** — JWT-based login/register with protected routes
- 📄 **Resume upload & parsing** — PDF upload with server-side text extraction
- 🤖 **AI-generated interview reports** — powered by Google Gemini, with Zod-based schema validation to guarantee reliable, consistent JSON output
- 📊 **Match score** — visual circular gauge showing how well your profile fits the target role
- ❓ **Technical & behavioral questions** — each with the interviewer's intention and a model answer, shown in an accordion UI
- 🧩 **Skill gap analysis** — highlighted by severity (low / medium / high)
- 🗓️ **7-day preparation roadmap** — a structured, day-wise study plan tailored to your gaps
- 📁 **Report history** — revisit any previously generated report from your dashboard

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios
- Lucide React (icons)
- Custom CSS (dark theme, no CSS framework)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens) for authentication
- Multer (file uploads)
- pdf-parse (resume text extraction)

**AI**
- Google Gemini API (`@google/genai`)
- Zod — schema definition and validation, converted to JSON Schema for constrained AI output

---

## 📂 Project Structure

```
AIResumeBuilder/
├── Backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Route handlers (auth, interview)
│   │   ├── middlewares/     # Auth middleware, file upload (Multer)
│   │   ├── models/          # Mongoose schemas (User, InterviewReport, Blacklist)
│   │   ├── routes/          # Express routers
│   │   ├── services/        # Gemini AI integration
│   │   └── app.js
│   └── server.js
│
└── Frontend/
    └── src/
        ├── features/
        │   ├── auth/         # Login, Register, auth context/hooks
        │   └── interview/    # Home (report generator), Interview (report viewer)
        ├── App.jsx
        └── app.routes.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local instance or MongoDB Atlas)
- A Google Gemini API key ([Google AI Studio](https://aistudio.google.com/))

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/AIResumeBuilder.git
cd AIResumeBuilder
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../Frontend
npm install
npm run dev
```

The app should now be running at `http://localhost:5173`, with the API at `http://localhost:3000`.

---

## 🔑 API Overview

| Method | Endpoint                        | Description                              | Auth Required |
|--------|----------------------------------|-------------------------------------------|----------------|
| POST   | `/api/auth/register`            | Register a new user                       | ❌ |
| POST   | `/api/auth/login`               | Log in and receive a JWT                  | ❌ |
| POST   | `/api/interview/`               | Upload resume + generate an interview report | ✅ |
| GET    | `/api/interview/`                | Get all interview reports for the logged-in user | ✅ |
| GET    | `/api/interview/report/:interviewId` | Get a specific interview report by ID | ✅ |

---

## 🧠 How the AI Report Generation Works

1. The candidate's resume (parsed from PDF), self-description, and target job description are sent to the Gemini API.
2. The expected report shape is defined once using a **Zod schema** — match score, technical/behavioral questions, skill gaps, and a 7-day preparation plan.
3. That schema is converted to JSON Schema (`z.toJSONSchema()`) and passed to Gemini's `responseJsonSchema` config, which constrains the model's output at the token level — guaranteeing the response always matches the expected structure and types.
4. The validated JSON is stored in MongoDB and rendered in the frontend as an interactive report.

---

## 📸 Screenshots

*(Add screenshots of the Home page, Login page, and Interview Report page here)*

---

## 🗺️ Possible Future Improvements

- Export the interview report as a downloadable PDF
- Voice-based mock interview practice
- Progress tracking across multiple preparation plans
- Public/shareable report links

---

## 📄 License

This project is for educational/portfolio purposes.

---

## 🙋 Author

**Nitesh Chavan**
[LinkedIn](https://linkedin.com/in/nitesh-chavan-27188b2a5/) · chavannitesh963@gmail.com
