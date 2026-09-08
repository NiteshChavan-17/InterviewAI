import { getAllInterviewReports, generateInterviewReport, getInterviewReportbyId } from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
    const context = useContext(InterviewContext)

    if(!context) {
        throw new Error("useInterview must be used within an interview Provider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context;

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({jobDescription,selfDescription,resumeFile});
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
        return response?.interviewReport;
    }

    const getReportbyId = async ({InterviewId}) => {
        setLoading(true);
        let response = null;
        try {
            response = await getInterviewReportbyId(InterviewId);
            setReport(response.interviewReport);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        return response?.interviewReport
    }

    const getReports = async () => {
        setLoading(true);
        let response = null;
        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        return response?.interviewReports
    }

    return {loading, reports, report, generateReport, getReportbyId, getReports}
}