🖋️ InkVerse

InkVerse is an interactive storytelling web application where every reader's decision shapes the course of the story. This project was developed as part of the RNCP Level 5 Certification - Web and Web Mobile Developer.


🚀 Features

Secure Authentication: Connection via Google OAuth for a personalized experience.

Immersive Reading: Clean and responsive interface for a smooth experience on PC, tablet, or mobile.

Dynamic Choice System: "Press and hold" validation (anti-error system) to enhance immersion.

Progress Saving: Automatically resumes reading from the last visited step.

Robust State Management: Fluid navigation between categories and stories.


🛠️ Technical Stack

Framework: Next.js (React / TypeScript)

Design: Tailwind CSS

Database: MySQL

Authentication: NextAuth.js (Google Provider)

Version Control: Git & GitHub


📂 Architecture

The project follows a strict separation of concerns:

Front-end: Modular React components and state management using hooks.

Back-end: Next.js API Routes handling CRUD operations and business logic.

Security: Route protection via Middleware and sensitive data hashing.


⚙️ Installation & Setup

1. Clone the repository
Bash

git clone https://github.com/Jerome0510/InkVerse.git
cd InkVerse

2. Environment Variables Configuration
Create a .env.local file in the root directory based on the provided .env.example:

MYSQL_DB_HOST=localhost,
MYSQL_DB_USER=your_user,
MYSQL_DB_PASSWORD=your_password,
MYSQL_DB_NAME=inkverse_db,

NEXT_PUBLIC_API_URL=http://localhost:3000,
NEXT_PUBLIC_APP_URL=http://localhost:3000,

NEXTAUTH_SECRET=your_auth_secret,
GOOGLE_CLIENT_ID=your_client_id,
GOOGLE_CLIENT_SECRET=your_client_secret,

3. Installation and Launch
Bash

# Install dependencies
npm install

# Run in development mode
npm run dev
The application will be available at http://localhost:3000.


🛡️ Security & Best Practices

Environment Variables: API keys and database credentials are isolated and not versioned on Git.

Strict Typing: TypeScript is used to minimize runtime errors.

Data Validation: User input control to prevent SQL injections and errors.


👨‍💻 Author

Jérôme Marbach - Project presented for the Web and Web Mobile Developer exam.

