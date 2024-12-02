import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRouter.js";
import apppointmentRouter from "./router/appointmentRouter.js";

const app = express();
config({ path: "./config/config.env" });

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // No trailing slashes
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions)); // CORS middleware applied before routes

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", apppointmentRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
