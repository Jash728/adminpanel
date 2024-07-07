import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projectRoutes.js"
import salesRoutes from "./routes/salesRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from 'dotenv';

config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/v1", projectRoutes);
app.use("/api/v2", salesRoutes);
app.use("/api/v3", adminRoutes);

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log("Working");
});
