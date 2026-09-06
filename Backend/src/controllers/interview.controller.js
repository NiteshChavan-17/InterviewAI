import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import { InterviewReport } from "../models/interview-report.model.js";

async function generateInterviewReportController(req,res) {

    
    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const {selfDescription, jobDescription} = req.body;
    const interviewReportbyAI = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription

    })

    const interviewReport = await InterviewReport.create({
        user: req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportbyAI
    })

    res.status(201).json({
        message: "Interview Report generated successfully",
        interviewReport
    })
}

export default generateInterviewReportController;