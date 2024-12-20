import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.routes.js";
import JobDescRouter from "./routes/jobdesc.routes.js";


const app = express();

app.use(cors({origin:'http://localhost:5173',credentials:true}));

app.use(express.json());
app.use(express.urlencoded({}));
app.use(cookieParser());

app.use("/api/user", UserRouter);
app.use("/api/job",JobDescRouter);

export {app};