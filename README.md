# 🌍 AI Travel Planner — TripGenius

A full-stack AI-powered travel planning application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Google Gemini AI**. Users can register, login, and create personalized AI-generated travel itineraries.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-blue)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-06B6D4)

---

## ✨ Features

- **AI-Powered Itineraries** — Google Gemini AI generates comprehensive travel plans
- **Day-by-Day Schedule** — Morning, afternoon, and evening activities
- **Hotel Suggestions** — Curated picks across budget tiers
- **Restaurant Recommendations** — Cuisine type, price range, must-try dishes
- **Budget Breakdown** — Realistic cost estimates for the entire trip
- **Packing Checklist** — Interactive, checkable packing list
- **Weather & Safety Tips** — Destination-specific advice
- **Local Transportation Guide** — How to get around your destination
- **User Authentication** — JWT-based registration and login
- **CRUD Operations** — Create, view, edit, delete, and search trips
- **Responsive Design** — Beautiful dark theme with glassmorphism effects

---

## 🛠️ Tech Stack

| Layer          | Technology                     |
|----------------|-------------------------------|
| Frontend       | React 19, Vite, Tailwind CSS v4 |
| Backend        | Node.js, Express.js           |
| Database       | MongoDB, Mongoose             |
| AI             | Google Gemini (`@google/genai`) |
| Auth           | JWT, bcryptjs                 |
| HTTP Client    | Axios                         |
| Routing        | React Router v7               |

---

## 📁 Project Structure

```
ai-travel-planner/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # Auth context
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Express backend (MVC)
│   ├── config/                # Database connection
│   ├── controllers/           # Route handlers
│   ├── middleware/             # Auth & error handling
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API routes
│   ├── services/              # Gemini AI service
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── setup.bat                  # Windows setup script
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Clone & Configure

```bash
# Navigate to the project
cd "ai travel planner"

# Configure environment variables
# Edit server/.env and set:
#   MONGO_URI=your_mongodb_connection_string
#   JWT_SECRET=your_secret_key
#   GEMINI_API_KEY=your_gemini_api_key
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

Or on Windows, run the setup script from the project root:
```bash
setup.bat
```

### 3. Start the Application

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173` (frontend) with API at `http://localhost:5000`.

---

## 🔑 API Endpoints

### Authentication
| Method | Endpoint              | Auth | Description         |
|--------|-----------------------|------|---------------------|
| POST   | `/api/auth/register`  | No   | Register new user   |
| POST   | `/api/auth/login`     | No   | Login & get JWT     |
| GET    | `/api/auth/profile`   | Yes  | Get user profile    |

### Trips
| Method | Endpoint              | Auth | Description                    |
|--------|-----------------------|------|-------------------------------|
| POST   | `/api/trips`          | Yes  | Create trip (calls Gemini AI) |
| GET    | `/api/trips`          | Yes  | Get all trips (?search=)      |
| GET    | `/api/trips/:id`      | Yes  | Get single trip               |
| PUT    | `/api/trips/:id`      | Yes  | Update trip                   |
| DELETE | `/api/trips/:id`      | Yes  | Delete trip                   |

---

## 🎨 Design

- **Theme**: Rich dark slate with indigo/violet gradient accents
- **Cards**: Glassmorphism with backdrop blur
- **Typography**: Inter (Google Fonts)
- **Animations**: Fade-in, slide-up, float, pulse-glow effects
- **Responsive**: Mobile-first design with hamburger menu

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
# AiTravelPlanner
