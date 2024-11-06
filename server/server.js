import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import createTables from "./models/createTables.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specific HTTP methods
    credentials: true, // Enable this if your frontend needs to send cookies or authorization headers
  })
);

app.use(express.json());

// Create tables automatically
(async () => {
  try {
    await db.getConnection();
    console.log("Connected to the MySQL database successfully.");

    // Run table creation
    await createTables();
  } catch (error) {
    console.error("Failed to set up the database:", error.message);
    process.exit(1); // Exit process if the setup fails
  }
})();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", likeRoutes);
app.use("/api/users", followRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
