import express from 'express';
import connectToMongoDB from './db/connectToMongoDb.js';
import quizRoutes from './routes/quizRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

const port = 5000;
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
dotenv.config();

//ROUTES
app.use("/api/quiz",quizRoutes);
app.use("/api/auth",authRoutes);

app.get("/", (req,res)=>{
    res.send("hi");
})

app.listen(port,()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${port}`);
})