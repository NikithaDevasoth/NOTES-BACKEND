import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ------------------ MIDDLEWARE ------------------

// Parse JSON bodies
app.use(express.json());

// Rate limiting
app.use(rateLimiter);

// CORS - allow local dev and deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://notes-frontend-mm14-5xldpa1ki-nikithas-projects-7e36f2ac.vercel.app", // deployed frontend
    ],
    credentials: true,
  })
);

// ------------------ ROUTES ------------------

app.use("/api/notes", notesRoutes);

// ------------------ CONNECT TO DB & START SERVER ------------------

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
