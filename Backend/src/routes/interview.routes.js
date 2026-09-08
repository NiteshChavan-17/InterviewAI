import express from 'express';
import authUser from '../middlewares/auth.middleware.js';
import generateInterviewReportController, { getAllinterviewReportsController, interviewReportbyIdController } from '../controllers/interview.controller.js';
import { upload } from '../middlewares/file.middleware.js';


const interviewRouter = express.Router();

interviewRouter.post("/",authUser, upload.single("resume"), generateInterviewReportController)
interviewRouter.get("/report/:interviewId", authUser,interviewReportbyIdController)
interviewRouter.get("/",authUser, getAllinterviewReportsController)

export default interviewRouter