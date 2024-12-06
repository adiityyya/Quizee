import express from "express";
import connectToMongoDB from "./db/connectToMongoDB.js";
import quizRoutes from "./routes/quizRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// MIDDLEWARES
app.use(cors({
  origin: "https://your-frontend-domain.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
  res.send("HI!")
});
// SERVER
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});
