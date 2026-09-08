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

async function interviewReportbyIdController(req,res) {
    const {interviewId} = req.params;

    const interviewReport = await InterviewReport.findOne({_id:interviewId, user:req.user.id})

    if(!interviewReport) {
        return res.status(404).json({
            message:"Interview Report not found"
        })
    }

    res.status(200).json({
        message: "Interview Report Fetched successfully",
        interviewReport
    })
}

async function getAllinterviewReportsController(req,res){
    const interviewReports = await InterviewReport.find({user:req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviorQuestions -skillGaps -preparationPlan")
    res.status(200).json({
        message:"Interview Reports fetched successfully.",
        interviewReports
    })
}


export default generateInterviewReportController;
export {interviewReportbyIdController, getAllinterviewReportsController}