import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import dbConnection from "./db.js";
import postRoutes from "./routes/posts.js";

// config
dotenv.config();
const PORT = process.env.PORT || 8080;
const CONNECTION_URL = process.env.CONNECTION_URL;
const CONNECTION_URL_2 = process.env.CONNECTION_URL_2;

dbConnection(CONNECTION_URL_2);
const app = express();

// middleware
const middleware = [
	express.json({ limit: "30mb", extended: true }),
	express.urlencoded({ limit: "30mb", extended: true }),
	cors(),
	morgan("tiny"),
];
app.use(middleware);

app.use("/posts", postRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
