// config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAi9VoWeuuwiP7s9Scq4dk2NBV8lyc4wXQ",
  authDomain: "marlon-d0d1b.firebaseapp.com",
  projectId: "marlon-d0d1b",
  storageBucket: "marlon-d0d1b.firebasestorage.app",
  messagingSenderId: "854423746336",
  appId: "1:854423746336:web:a93c2997b2c47639f18945",
  measurementId: "G-E4N3KHHXLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance directly
export const auth = getAuth(app);

export { app };
export default app;