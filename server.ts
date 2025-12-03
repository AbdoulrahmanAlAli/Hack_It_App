import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./configs/connectToDb";
import { errorHandler, notFound } from "./middlewares/error";
import compression from "compression";

// .env
dotenv.config();

// routes import student
import routeAuthStudent from "./routes/users/students/Auth.route";
import routeCtrlStudent from "./routes/users/students/Student.route";
import routeResult from "./routes/results/Result.route";

// routes import teacher
import routeAuthTeacher from "./routes/users/teachers/Auth.route";
import routeCtrlTeacher from "./routes/users/teachers/Teacher.route";

// route import admin
import routeAuthAdmin from "./routes/users/admin/Auth.route";
import routeCtrlAdmin from "./routes/users/admin/Admin.route";

// route import course
import routeCourse from "./routes/course/Course.route";
import routeSession from "./routes/course/session/Session.route";
import routeFile from "./routes/course/session/file/File.route";
import routeComment from "./routes/course/comment/Comment.route";
import routeExam from "./routes/course/exam/Exam.route";
import routeGroup from "./routes/course/exam/group/Group.route";
import routeQuestion from "./routes/course/exam/question/Question.route";

// route import bank
import routeBank from "./routes/banks/Bank.route";
import routeContent from "./routes/banks/content/Content.route";
import routeGroupBank from "./routes/banks/content/group/GroupBank.route";
import routeQuestionBank from "./routes/banks/content/question/QuestionBank.route";

// route import payment
import routePayment from "./routes/payment/Payment.route";

// route import notification
import routeNotification from "./routes/notification/Notification.route";

// route import Version
import routeVersion from "./routes/version/Version.route";

// route import Ads
import routeAds from "./routes/ads/Ads.route";

// import hls
import hlsRouter from "./routes/hls/hls.routes";

// Validate required environment variables
const requiredEnvVars = [
  "MONGO_URL",
  "JWT_SECRET_KEY",
  "NODE_ENV",
  "PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
  "OTP_PEPPER",
  "JWT_SECRET_KEY",
];

requiredEnvVars.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
});

// Connection To Db
connectDB();

// Init App
const app = express();

// middleware
app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

//Cors Policy
app.use(
  cors({
    origin: ["*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is running in Hack it");
});
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Routes Student
app.use("/api/hackit/ctrl/student", routeAuthStudent);
app.use("/api/hackit/ctrl/student", routeCtrlStudent);
app.use("/api/hackit/ctrl/result", routeResult);

// Routes Teacher
app.use("/api/hackit/ctrl/teacher", routeAuthTeacher);
app.use("/api/hackit/ctrl/teacher", routeCtrlTeacher);

// Routes Admin
app.use("/api/hackit/ctrl/admin", routeAuthAdmin);
app.use("/api/hackit/ctrl/admin", routeCtrlAdmin);

// Routes Course
app.use("/api/hackit/ctrl/course", routeCourse);
app.use("/api/hackit/ctrl/session", routeSession);
app.use("/api/hackit/ctrl/file", routeFile);
app.use("/api/hackit/ctrl/comment", routeComment);
app.use("/api/hackit/ctrl/exam", routeExam);
app.use("/api/hackit/ctrl/groupExam", routeGroup);
app.use("/api/hackit/ctrl/questionExam", routeQuestion);

// Routes Bank
app.use("/api/hackit/ctrl/bank", routeBank);
app.use("/api/hackit/ctrl/content", routeContent);
app.use("/api/hackit/ctrl/groupBank", routeGroupBank);
app.use("/api/hackit/ctrl/questionBank", routeQuestionBank);

// Routes Payment
app.use("/api/hackit/ctrl/payment", routePayment);

// Routes Notification
app.use("/api/hackit/ctrl/notification", routeNotification);

// Routes Version
app.use("/api/hackit/ctrl/version", routeVersion);

// Routes Ads
app.use("/api/hackit/ctrl/ads", routeAds);

// Routes Hls
app.use("/api/hackit/hls", hlsRouter);

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

//Running The Server
const PORT: number = parseInt(process.env.PORT || "5000");
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
