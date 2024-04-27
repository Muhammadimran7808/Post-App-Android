import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import postRoutes from "./routes/postRoutes.js";

// configure env
dotenv.config();

// database connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes)

// root route
app.get("/", (req, res) => {
  res.send("Server is running");
});


// port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`.bgCyan.white);
});
