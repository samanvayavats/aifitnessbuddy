# 🏋️‍♂️ AI Fitness Buddy

AI Fitness Buddy is a personalized fitness assistant web app built with **Next.js (App Router)**, **Tailwind CSS**, and **NextAuth.js**. It uses **DeepSeek AI** to generate dynamic workout and diet plans based on user input and feedback.

---

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router) + Tailwind CSS
- **Backend**: API Routes in Next.js
- **Authentication**: NextAuth.js
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: DeepSeek API (via OpenRouter )
- **Cloudinary**: For image uploads 

---

## 📂 Folder Structure Overview

/app
/login → Auth UI
/contact → Contact page
/aifitnessbuddy → Main fitness dashboard
/users → User management
/components
/layout → Navbar, Footer
sessionWrapper.js → Auth provider wrapper
/lib
cloudinary.js → Image upload helper
dbconnect.js → MongoDB connection
/models
user.model.js → User schema
contact.model.js → Contact schema


---

## 🔐 Authentication

- Using **NextAuth.js**
- Supports credential login (extendable to OAuth like Google)
---

## 🤖 AI Plan Generation

- Uses **DeepSeek AI** (via OpenRouter or API key)
- API calls made from `/api/plan/generate`
- Input: user profile + feedback
- Output: dynamic workout and diet plan
- Prompt-based interaction like:
  > *“Generate a 1-day diet and workout plan for a 22-year-old male weighing 70kg, goal: fat loss.”*

---

## 🧪 Features

- [x] User registration and login
- [x] AI-generated workout & diet plans
- [X] Save and view history (coming soon)


---

## 🛠️ Getting Started

### 1. Clone the repo
```bash
https://github.com/samanvayavats/aifitnessbuddy.git
cd aifitnessbuddy

npm install

.env 
DB_STRING = 
API_KEY_FOR_AI_REQUEST = 
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
NEXTAUTH_URL=

npm run dev

👨‍💻 Author
Made with ❤️ by Samanvaya Vats
