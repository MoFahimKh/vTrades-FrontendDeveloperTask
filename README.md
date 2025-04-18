# React + TypeScript + Vite – V-Trade Task

This project is a modern React application scaffolded using **Vite** and **TypeScript**, featuring authentication, OTP verification, and password reset functionality. It uses **EmailJS** for email-based OTP delivery, along with **Google** and **Microsoft** OAuth for secure login.

## 🌐 Live Demo

🔗 [https://v-trade-task-1.netlify.app/sign-in](https://v-trade-task-1.netlify.app/sign-in)

---

## 🚀 Tech Stack

- **React** – Frontend library
- **Vite** – Lightning-fast dev server & bundler
- **TypeScript** – Static typing for JavaScript
- **Tailwind CSS** – Utility-first CSS framework
- **React Router** – Routing and page navigation
- **React Icons** – Icon library for UI
- **EmailJS** (`@emailjs/browser`) – Email OTP delivery
- **Google OAuth** (`@react-oauth/google`) – Google login
- **Microsoft OAuth** (`react-microsoft-login`) – Microsoft login

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/MoFahimKh/vTrades-FrontendDeveloperTask.git
cd v-trade-task
npm install
```

## 🧪 Run the Dev Server

Start the Vite dev server locally:

```bash
npm run dev
```

This will spin up the app at http://localhost:5173.

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

This generates an optimized build in the `dist/` directory.

## 🚀 Deployment

The project is deployed to **Netlify**:

🔗 [https://v-trade-task-1.netlify.app/sign-in](https://v-trade-task-1.netlify.app/sign-in)

To deploy your own:

1. Push your code to **GitHub**
2. Link your repository in **[Netlify](https://netlify.com/)**
3. Set the **build command** to:

   ```bash
   npm run build
   ```

4. Set the publish directory to:

```bash
dist
```
