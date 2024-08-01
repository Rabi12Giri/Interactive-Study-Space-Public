import cors from "cors";
import express from "express";
import logger from "morgan";
import { PORT, STATIC_FOLDER } from "./config/config.js";
import connectDB from "./connectDB/db.js";
import apiRouter from "./routes/index.js";
import handleError from "./middlewares/globalErrorHandler.js";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(STATIC_FOLDER));

app.use("/", apiRouter);

app.use(handleError);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
