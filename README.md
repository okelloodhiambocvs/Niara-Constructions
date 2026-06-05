# Niara Constructions

Niara Constructions is a modern web application showcasing construction and design-build services, built with a focus on performance, responsiveness, and clean user experience.

The project is built as a single-page application using a component-driven architecture, making it easy to scale, maintain, and extend.

---

## Project Overview

This application presents a professional digital presence for a construction company, including:

* Company overview and services
* Project portfolio showcase
* Client testimonials
* Contact and inquiry system
* Cost estimation tool
* Careers and hiring section
* Interactive UI components

The design is optimized for both desktop and mobile experiences.

---

## Tech Stack

Frontend:

* React (TypeScript)
* Vite (build tool)
* Tailwind CSS (styling)
* Framer Motion / Motion (animations)

State & Utilities:

* React Context API
* Environment variables (.env support)

Build Tooling:

* Vite
* TypeScript
* ESLint (type checking)

---

## Project Structure

src/
├── components/
│   ├── portfolio/        # Advanced visual components (3D, timeline, metrics)
│   ├── Navbar.tsx        # Main navigation
│   ├── Hero.tsx          # Landing section
│   ├── Services.tsx     # Services overview
│   ├── Portfolio.tsx    # Project showcase
│   ├── Testimonials.tsx # Client feedback
│   ├── Contact.tsx      # Contact form
│   ├── Footer.tsx       # Footer section
│   └── shared UI modules
│
├── App.tsx              # Application root
├── main.tsx             # Entry point
└── index.css            # Global styles

---

## Installation

### 1. Clone the repository

git clone https://github.com/okelloodhiambocvs/Niara-Constructions.git

### 2. Install dependencies

npm install

### 3. Run development server

npm run dev

The app will run on:
http://localhost:3000

---

## Build for Production

To generate a production build:

npm run build

The output will be generated in:

dist/

To preview production build locally:

npm run preview

---

## Environment Variables

Create a `.env` file in the root directory:

GEMINI_API_KEY=your_api_key_here

APP_URL=http://localhost:3000

Note: Environment variables are required only for AI-assisted or dynamic features.

---

## Code Quality & Type Checking

Run TypeScript validation:

npm run lint

---

## Testing Strategy

Currently, the project does not include automated unit tests, but follows manual validation steps:

### Manual UI Testing

* Verify homepage renders correctly
* Check navigation between sections
* Validate responsive behavior on mobile
* Test contact form interactions
* Ensure animations load smoothly

### Build Verification

Always run before deployment:

npm run build

Ensure:

* No build errors
* dist/ folder is generated
* Assets load correctly

---

## Deployment (Railway)

This project is deployment-ready for Railway or any static hosting platform.

Steps:

1. Run production build:
   npm run build

2. Deploy `dist/` folder as static site

3. Ensure:

   * index.html is entry point
   * assets are correctly referenced

---

## Performance Notes

* Large bundle size warning is expected due to animation libraries
* Can be optimized using code splitting in future iterations
* Images and assets should be compressed for production

---

## Future Improvements

* Add backend API (Node.js/Express or NestJS)
* Add database integration (PostgreSQL or MongoDB)
* Implement automated testing (Jest / Playwright)
* Improve code splitting for performance
* Add CI/CD pipeline

---

## Author

Niara Constructions Web Platform

Built as a production-ready frontend system for scalable deployment.
