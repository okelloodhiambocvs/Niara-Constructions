Niara Constructions

Overview

Niara Constructions is a modern construction and design-build web application built using React, TypeScript, and Vite. It is designed to showcase construction services, portfolio projects, company milestones, and client engagement features for a professional construction firm operating in Kenya.

The application focuses on performance, modular UI architecture, and scalability, with reusable components and a clean frontend structure that can be extended into a full-stack system.

---

Tech Stack

Frontend:

* React (with TypeScript)
* Vite (build tool and dev server)
* CSS (custom styling and utility-based structure)
* Framer Motion (animations)
* Lucide React (icons)

State & UI Architecture:

* React Context API (Theme, Language, UI state)
* Component-based architecture

Build Tooling:

* Vite
* TypeScript
* ESLint (type checking via tsc)

---

Project Structure

src/
components/
About.tsx
Careers.tsx
Contact.tsx
CostEstimator.tsx
CTA.tsx
FAQ.tsx
Footer.tsx
Hero.tsx
LanguageContext.tsx
Logo.tsx
Milestones.tsx
Navbar.tsx
Portfolio.tsx
Process.tsx
SearchModal.tsx
Services.tsx
Testimonials.tsx
ThemeContext.tsx
Toast.tsx
WhatsAppButton.tsx
WhyChoose.tsx

components/portfolio/
ImageComparison.tsx
ProjectTimeline.tsx
SustainabilityMetrics.tsx
ThreeDViewer.tsx

App.tsx
main.tsx
index.css

---

Installation & Setup

1. Clone the repository

git clone https://github.com/okelloodhiambocvs/Niara-Constructions.git

2. Navigate into the project

cd Niara-Constructions

3. Install dependencies

npm install

4. Start development server

npm run dev

The application will run at:
http://localhost:3000

---

Build for Production

To generate a production-ready build:

npm run build

The output will be generated in the dist/ folder.

---

Preview Production Build

npm run preview

This allows you to test the production build locally before deployment.

---

Code Quality Check

Run TypeScript validation:

npm run lint

This ensures there are no type errors before deployment.

---

Environment Variables

Create a .env file if backend or API integration is added:

GEMINI_API_KEY=your_key_here
APP_URL=http://localhost:3000

---

Deployment (Railway)

This project is compatible with Railway deployment.

Build command:
npm run build

Start command:
npm run preview

Ensure:

* dist/ is generated
* Node version >= 18

---

Future Improvements

* Backend API integration (Node.js / Express)
* Database layer (PostgreSQL or MongoDB)
* Admin dashboard for project management
* CMS integration for portfolio updates
* Image optimization and lazy loading
* SEO optimization and meta tagging

---

Testing Checklist

Before deployment, ensure:

* Application loads without console errors
* Navigation between sections works
* Responsive layout tested on mobile and desktop
* Build completes successfully (npm run build)
* Preview works correctly (npm run preview)
* No TypeScript errors (npm run lint)

---

Notes

This project was originally generated using AI-assisted tooling and has been structured into a production-ready frontend architecture suitable for deployment and future scaling.
