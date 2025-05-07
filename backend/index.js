import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import fs from "fs";

dotenv.config({});

const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../frontend/dist");

    // Check if the dist directory exists
    if (!fs.existsSync(distPath)) {
        console.error("Error: 'dist' directory not found. Ensure the frontend is built before deployment.");
        process.exit(1);
    }

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server Running at Port: ${PORT}`);
})