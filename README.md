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
git clone https://github.com/Jerome0510/InkVerse.git
cd InkVerse
```

---

### MySQL Database Configuration
```bash
MYSQL_DB_HOST=localhost
MYSQL_DB_USER=your_db_user
MYSQL_DB_PASSWORD=your_db_password
MYSQL_DB_NAME=inkverse_db

NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

🛡️ Security & Best Practices.

**Environment Variables**: All API keys and database credentials are kept out of version control via .gitignore.

**Type Safety**: Full TypeScript implementation to catch errors during development.

**Data Integrity**: Server-side validation.

👨‍💻 Author

**Jérôme Marbach** - Junior Full-Stack Developer Project developed for the Web and Web Mobile Developer professional certification.

