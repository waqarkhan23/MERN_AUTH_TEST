import express from "express";
import connectDB from "./DB/index.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import vehicleRouter from "./routes/vehicle.routes.js";

const app = express();

dotenv.config({});
connectDB();

const PORT = process.env.PORT || 8000;
app.get("/", (req,res)=>{
  res.json({message:"running"})
})
app.use(
  cors({
    origin: "https://mern-auth-frontend-sand.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", vehicleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
