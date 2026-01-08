# 🖋️ InkVerse

**InkVerse** is an interactive storytelling web application inspired by "Choose Your Own Adventure" books. It provides a platform where readers become actors, making decisions that directly impact the narrative flow and lead to multiple story endings.

This project was developed as part of the **RNCP Level 5 Certification - Web and Web Mobile Developer**.

---

## 🚀 Features

* **Secure Authentication**: User login via Google OAuth (NextAuth.js) for a personalized and secure experience.
* **Immersive Reading Interface**: A clean, distraction-free design optimized for reading comfort.
* **Dynamic Choice System**: A "press and hold" interaction to confirm choices, preventing accidental clicks and increasing immersion.
* **Automatic Progress Saving**: The application tracks and saves user progression, allowing readers to resume exactly where they left off.
* **Responsive Design**: A fully fluid experience across Desktop, Tablet, and Smartphone.

## 🛠️ Technical Stack

* **Frontend**: [Next.js](https://nextjs.org/) (React / TypeScript)
* **Styling**: [CSS](https://tailwindcss.com/)
* **Backend**: Next.js API Routes (Serverless)
* **Database**: MySQL
* **Authentication**: NextAuth.js
* **Version Control**: Git & GitHub

## 📂 Architecture

The project follows a strict **Separation of Concerns (SoC)**:
* **Frontend**: Modular React components using functional programming and state management via Hooks (useState, useEffect).
* **Backend**: RESTful API design handling CRUD operations for stories, user progress, and categories.
* **Security**: Middleware implementation for route protection and secure handling of sensitive credentials.

---

## ⚙️ Installation & Configuration

### 1. Clone the repository
```bash
git clone [https://github.com/Jerome0510/InkVerse.git](https://github.com/Jerome0510/InkVerse.git)
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

