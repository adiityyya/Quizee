import express from "express";
import connectToMongoDB from "./db/connectToMongoDb.js";
import quizRoutes from "./routes/quizRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const port = 5000;
const app = express();

const __dirname = path.resolve();
//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

//ROUTES
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(port, () => {
    connectToMongoDB()
      .then(() => {
        console.log('Connected to MongoDB successfully');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
  
    console.log(`Server Running on port ${port}`);
  });
  
