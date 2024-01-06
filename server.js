import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { router } from "./routes/userRoutes.js";
import { arouter } from "./routes/adminRoutes.js";
import { drouter } from "./routes/doctorRoute.js";
import { fileURLToPath } from "url";
import path from "path";
const port = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));
app.use("/api/v1/auth", router);
app.use("/api/v1/admin", arouter);
app.use("/api/v1/doctor", drouter);

app.use(express.static(path.join(__dirname, "./client/build")));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(port, () => {
  console.log(`app listen on the port ${port}`);
});
