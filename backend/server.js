import express from "express";
import connectToMongoDB from "./db/connectToMongoDB.js";
import quizRoutes from "./routes/quizRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// dotenv.config({ path: "./.env" });
dotenv.config();

// const __dirname = path.resolve();
const port = process.env.PORT || 5000;
const app = express();

// MIDDLEWARES
// Configure CORS
const corsOptions = {
  origin: "https://quizee-frontend-indol.vercel.app", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"], 
};

// Use CORS middleware
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

// app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  // console.log("hello ji");
  res.send("HI");
});

// app.get("*", (req, res) => {
//   // console.log("hello ji");
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });
// SERVER
// console.log("url: ", process.env.MONGO_DB_URI)
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});
