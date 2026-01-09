# 🖋️ InkVerse

**InkVerse** is an interactive storytelling web application inspired by "Choose Your Own Adventure" books. It provides a platform where readers become actors, making decisions that directly impact the narrative flow and lead to multiple story endings.

This project was developed as part of the **RNCP Level 5 Certification - Web and Web Mobile Developer**.

---

## 🚀 Features

* **Immersive Reading Interface**: A clean, distraction-free design optimized for reading comfort.
* **Dynamic Choice System**: A "press and hold" interaction to confirm choices, preventing accidental clicks and increasing immersion.
* **Automatic Progress Saving**: The application tracks and saves user progression, allowing readers to resume exactly where they left off.
* **Responsive Design**: A fully fluid experience across Desktop and Smartphone.

## 🛠️ Technical Stack

* **Runtime environment**: [Node.js] (https://nodejs.org)
* **Framework**: [Next.js](https://nextjs.org/) (React / TypeScript)
* **Styling**: [CSS.module] ( Scoped Custom stylesheets)
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

### 2. Environment setup

Create a .env.local file in the rooy directory and fill it with your credential ( see .env.exemple for the required keys):

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


### 3. Install dependencies
```bash
npm install
```

### 4. Database setup (migration and seding)

To create the table structure and import the initial stories / categories, run the following commands: 
```bash
# Run database migrations to create tables
npm run db:migrate
```
```bash
# Seed the database with initial stories and data
npm run db:seed
```

### 5. Launch the application
```bash
# Start development server
npm run dev
```

The app will be accessible at http:/localhost:3000 .


---
## 🛡️ Security & Best Practices.

Environment Variables: Sensitive data is isolated in .env files and excluded from version control via .gitignore.

Type Safety: Full TypeScript implementation to catch errors during development and ensure code reliability.

Data Integrity: Server-side validation to prevent SQL injections and maintain database consistency.

## 👨‍💻 Author

**Jérôme Marbach** - Junior Full-Stack Developer Project developed for the Web and Web Mobile Developer professional certification.

