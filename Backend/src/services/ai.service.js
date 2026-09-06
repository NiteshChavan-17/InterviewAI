import { GoogleGenAI } from "@google/genai";
import {z} from "zod";

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

async function InvokeGeminiAI() {
    const response = await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:"Hello Gemini ! Explain what is interview ?"
    })

    console.log(response.text)
}

const interviewReportSchema = z.object({
    matchScore:z.number().describe("The score between 0 to 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical Questions asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind this question"),
        answer: z.string().describe("How to answer the question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview and their intention and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral Questions asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind this question"),
        answer: z.string().describe("How to answer the question, what points to cover, what approach to take etc.")
    })).describe("Behavior questions that can be asked in the interview and their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill in which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in preparartion plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan e.g data structures, mock interviews"),
        tasks: z.array(z.string()).describe("List of Tasks to be done on this days to follow the preparation plan")
    })).describe("A day-wise preparation plan for candidate to follow in order to prepare for interview effectively")
})

async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    const prompt = `Generate an interview report for candidate with following details
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}`
    const response = await ai.models.generateContent({

        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema)
        }
    })

    return JSON.parse(response.text)
}

export default generateInterviewReport